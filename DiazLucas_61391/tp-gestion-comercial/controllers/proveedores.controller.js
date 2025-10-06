// controllers/proveedores.controller.js
const db = require('../config/DB');

const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM proveedores');
    res.json(rows);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM proveedores WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { nombre, contacto, telefono } = req.body;
    const [result] = await db.query('INSERT INTO proveedores (nombre,contacto,telefono) VALUES (?,?,?)', [nombre, contacto, telefono]);
    const [rows] = await db.query('SELECT * FROM proveedores WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { nombre, contacto, telefono } = req.body;
    await db.query('UPDATE proveedores SET nombre=?, contacto=?, telefono=? WHERE id=?', [nombre, contacto, telefono, req.params.id]);
    const [rows] = await db.query('SELECT * FROM proveedores WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await db.query('DELETE FROM proveedores WHERE id = ?', [req.params.id]);
    res.json({ message: 'Proveedor eliminado' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
