// controllers/reset.controller.js
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const poolCb = require("../config/DB"); // pool callback-based
const pool = poolCb.promise ? poolCb.promise() : poolCb; // wrapper promesa
const { sendMail } = require("../services/email.service");

const EXP_MIN = Number(process.env.RESET_TOKEN_EXP_MIN || 60);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

async function findUserByEmail(email) {
  // Buscamos primero socio y luego usuario staff
  const [socios] = await pool.query(
    "SELECT id AS user_id, email FROM socios WHERE email = ?",
    [email]
  );
  if (socios.length)
    return {
      user_type: "socio",
      user_id: socios[0].user_id,
      email: socios[0].email,
    };

  const [usuarios] = await pool.query(
    "SELECT usuario_id AS user_id, correo AS email FROM usuarios WHERE correo = ?",
    [email]
  );
  if (usuarios.length)
    return {
      user_type: "usuario",
      user_id: usuarios[0].user_id,
      email: usuarios[0].email,
    };

  return null;
}

exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ ok: false, msg: "Email es requerido" });

    const user = await findUserByEmail(email);
    if (!user) {
      // Por seguridad respondemos 200 igual (no revelamos existencia)
      return res.json({
        ok: true,
        msg: "Si el email existe, recibirás instrucciones",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = addMinutes(new Date(), EXP_MIN);

    await pool.query(
      `INSERT INTO password_resets (user_type, user_id, email, token, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user.user_type, user.user_id, user.email, token, expiresAt]
    );

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}&type=${user.user_type}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Recuperación de contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Hacé clic en el siguiente botón para continuar (válido por ${EXP_MIN} minutos):</p>
        <p>
          <a href="${resetLink}" style="display:inline-block;padding:10px 16px;border-radius:6px;text-decoration:none;border:1px solid #eee">
            Restablecer contraseña
          </a>
        </p>
        <p>Si no fuiste vos, ignorá este mensaje.</p>
      </div>
    `;

    await sendMail({
      to: user.email,
      subject: "Restablecer contraseña",
      html,
    });

    res.json({ ok: true, msg: "Si el email existe, recibirás instrucciones" });
  } catch (err) {
    console.error("requestReset error", err);
    res.status(500).json({ ok: false, msg: "Error interno" });
  }
};

exports.confirmReset = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "token y newPassword son requeridos" });
    }

    const [rows] = await pool.query(
      `SELECT id, user_type, user_id, email, expires_at, used_at
       FROM password_resets
       WHERE token = ?`,
      [token]
    );
    if (!rows.length)
      return res.status(400).json({ ok: false, msg: "Token inválido" });

    const pr = rows[0];
    if (pr.used_at)
      return res.status(400).json({ ok: false, msg: "Token ya utilizado" });
    if (new Date(pr.expires_at) < new Date())
      return res.status(400).json({ ok: false, msg: "Token expirado" });

    const saltRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltRounds);

    if (pr.user_type === "socio") {
      await pool.query("UPDATE socios SET password = ? WHERE id = ?", [
        hash,
        pr.user_id,
      ]);
    } else {
      // Para usuarios staff, si ya migraste a bcrypt, usar password_hash y dejar contrasena en desuso
      await pool.query(
        'UPDATE usuarios SET password_hash = ?, contrasena = "" WHERE usuario_id = ?',
        [hash, pr.user_id]
      );
    }

    await pool.query(
      "UPDATE password_resets SET used_at = NOW() WHERE id = ?",
      [pr.id]
    );

    res.json({ ok: true, msg: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("confirmReset error", err);
    res.status(500).json({ ok: false, msg: "Error interno" });
  }
};
