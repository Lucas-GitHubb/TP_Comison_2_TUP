import pool from "../config/db.js";
import { sendMail } from "../service/email.service.js";
import { generateRawToken, hashToken, compareToken } from "../utils/resetToken.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

// POST /api/password/forgot  { email }
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ ok:false, msg:"Email es requerido" });

  try {
    const [rows] = await pool.query(
      "SELECT id, email FROM usuarios WHERE email = ?",
      [email]
    );

    // No revelar si existe o no (evita enumeración)
    if (rows.length === 0) {
      return res.json({ ok:true, msg:"Si el email existe, se enviará un enlace de recuperación." });
    }

    const user = rows[0];

    // token
    const rawToken = generateRawToken(32);
    const tokenHash = await hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await pool.query(
      "INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
      [user.id, tokenHash, expiresAt]
    );

    const base = process.env.FRONTEND_BASE_URL || process.env.APP_BASE_URL || "http://localhost:3000";
    const resetLink = `${base}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

    const html = `
      <p>Solicitaste recuperar tu contraseña.</p>
      <p>Este enlace expira en 1 hora:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Si no fuiste vos, ignorá este correo.</p>
    `;

    await sendMail({ to: user.email, subject: "Recuperar contraseña", html });

    return res.json({ ok:true, msg:"Si el email existe, se enviará un enlace de recuperación." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok:false, msg:"Error al procesar la solicitud" });
  }
};

// POST /api/password/reset  { email, token, newPassword }
export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) {
    return res.status(400).json({ ok:false, msg:"email, token y newPassword son requeridos" });
  }

  try {
    const [users] = await pool.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (users.length === 0) return res.status(400).json({ ok:false, msg:"Token inválido" });
    const user = users[0];

    const [resets] = await pool.query(
      "SELECT id, token_hash, expires_at, used_at FROM password_resets WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
      [user.id]
    );

    let match = null;
    for (const r of resets) {
      const notUsed = !r.used_at;
      const notExpired = new Date(r.expires_at) > new Date();
      if (notUsed && notExpired) {
        const ok = await compareToken(token, r.token_hash);
        if (ok) { match = r; break; }
      }
    }
    if (!match) return res.status(400).json({ ok:false, msg:"Token inválido o expirado" });

    const saltRounds = 10;
    const newHash = await bcrypt.hash(newPassword, saltRounds);
    await pool.query("UPDATE usuarios SET password = ? WHERE id = ?", [newHash, user.id]);

    await pool.query("UPDATE password_resets SET used_at = NOW() WHERE id = ?", [match.id]);

    return res.json({ ok:true, msg:"Contraseña actualizada correctamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok:false, msg:"Error al actualizar la contraseña" });
  }
};
