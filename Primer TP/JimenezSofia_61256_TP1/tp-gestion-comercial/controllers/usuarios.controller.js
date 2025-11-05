const { pool } = require('../config/DB.js');

exports.listar = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE activo=1 ORDER BY id DESC');
  res.json(rows);
};

exports.obtenerPorId = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(rows[0]);
};

exports.crear = async (req, res) => {
  const { nombre, apellido, email, telefono, rol } = req.body;
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, email, telefono, rol) VALUES (?,?,?,?,?)',
    [nombre, apellido, email, telefono, rol || 'vendedor']
  );
  res.status(201).json({ id: result.insertId, nombre, apellido, email, rol });
};

exports.actualizar = async (req, res) => {
  const { nombre, apellido, email, telefono, rol } = req.body;
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre=?, apellido=?, email=?, telefono=?, rol=? WHERE id=?',
    [nombre, apellido, email, telefono, rol, req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Usuario actualizado' });
};

exports.eliminar = async (req, res) => {
  const [result] = await pool.query('UPDATE usuarios SET activo=0 WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.status(204).send();
};
