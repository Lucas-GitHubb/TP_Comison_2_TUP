// controllers/usuarios.controller.js
const db = require('../config/DB');

const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { nombre, email, rol } = req.body;
    const [result] = await db.query('INSERT INTO usuarios (nombre,email,rol) VALUES (?,?,?)', [nombre, email, rol || 'empleado']);
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { nombre, email, rol } = req.body;
    await db.query('UPDATE usuarios SET nombre=?, email=?, rol=? WHERE id=?', [nombre, email, rol, req.params.id]);
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
