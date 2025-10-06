// controllers/productos.controller.js
const db = require('../config/DB');

const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT p.*, pr.nombre as proveedor_nombre FROM productos p LEFT JOIN proveedores pr ON p.proveedor_id = pr.id');
    res.json(rows);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
    const [result] = await db.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, proveedor_id) VALUES (?,?,?,?,?)',
      [nombre, descripcion, precio || 0, stock || 0, proveedor_id || null]
    );
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
    await db.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, proveedor_id=? WHERE id=?',
      [nombre, descripcion, precio, stock, proveedor_id, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
