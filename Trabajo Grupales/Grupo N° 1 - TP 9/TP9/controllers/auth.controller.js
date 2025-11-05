// controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const poolCb = require("../config/DB"); // pool callback
const pool = poolCb.promise ? poolCb.promise() : poolCb;

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "12h",
  });
}

exports.authLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, msg: "Email y password son requeridos" });
    }

    // 1) Intentar como socio (bcrypt obligado)
    const [socios] = await pool.query(
      "SELECT id, email, password FROM socios WHERE email = ?",
      [email]
    );
    if (socios.length) {
      const socio = socios[0];
      const ok = await bcrypt.compare(password, socio.password);
      if (!ok)
        return res
          .status(401)
          .json({ ok: false, msg: "Credenciales inválidas" });

      const token = signToken({
        user_type: "socio",
        id: socio.id,
        email: socio.email,
      });
      return res.json({
        ok: true,
        user_type: "socio",
        token,
      });
    }

    // 2) Intentar como usuario staff (admin/operador)
    const [usuarios] = await pool.query(
      "SELECT usuario_id, correo, contrasena, password_hash, rol FROM usuarios WHERE correo = ?",
      [email]
    );
    if (!usuarios.length) {
      return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
    }

    const u = usuarios[0];
    let valid = false;

    if (u.password_hash && u.password_hash.length > 0) {
      // Ya migrado a bcrypt
      valid = await bcrypt.compare(password, u.password_hash);
    } else {
      // Aún en texto plano (compatibilidad)
      valid = password === u.contrasena;
    }

    if (!valid)
      return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });

    const token = signToken({
      user_type: "usuario",
      id: u.usuario_id,
      email: u.correo,
      rol: u.rol || "admin",
    });

    res.json({
      ok: true,
      user_type: "usuario",
      rol: u.rol || "admin",
      token,
    });
  } catch (err) {
    console.error("authLogin error", err);
    res.status(500).json({ ok: false, msg: "Error interno" });
  }
};
