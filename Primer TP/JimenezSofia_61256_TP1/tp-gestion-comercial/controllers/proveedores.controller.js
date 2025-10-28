const { pool } = require('../config/DB.js');

exports.listar = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM proveedores WHERE activo=1 ORDER BY id DESC');
  res.json(rows);
};

exports.obtenerPorId = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM proveedores WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Proveedor no encontrado' });
  res.json(rows[0]);
};

exports.crear = async (req, res) => {
  const { nombre, cuit, email, telefono, direccion } = req.body;
  const [result] = await pool.query(
    'INSERT INTO proveedores (nombre, cuit, email, telefono, direccion) VALUES (?,?,?,?,?)',
    [nombre, cuit, email, telefono, direccion]
  );
  res.status(201).json({ id: result.insertId, nombre });
};

exports.actualizar = async (req, res) => {
  const { nombre, cuit, email, telefono, direccion } = req.body;
  const [result] = await pool.query(
    'UPDATE proveedores SET nombre=?, cuit=?, email=?, telefono=?, direccion=? WHERE id=?',
    [nombre, cuit, email, telefono, direccion, req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });
  res.json({ message: 'Proveedor actualizado' });
};

exports.eliminar = async (req, res) => {
  const [result] = await pool.query('UPDATE proveedores SET activo=0 WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });
  res.status(204).send();
};
