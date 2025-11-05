const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const { sendPasswordResetEmail } = require('../services/email.service');

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Datos incompletos' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user);
    res.status(201).json({ user: { id: user.id, name, email }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = signToken(user);
    res.json({ user: { id: user.id, name: user.name, email }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

async function me(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'createdAt'] });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: 'Error' });
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ ok: true }); // no revelar si existe o no

    const token = crypto.randomBytes(32).toString('hex');
    const exp = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

    await user.update({ resetToken: token, resetTokenExp: exp });

    await sendPasswordResetEmail(email, token);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al solicitar reset' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Datos incompletos' });

    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    const hashed = await hashPassword(password);
    await user.update({ password: hashed, resetToken: null, resetTokenExp: null });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al restablecer' });
  }
}

module.exports = { register, login, me, requestPasswordReset, resetPassword };