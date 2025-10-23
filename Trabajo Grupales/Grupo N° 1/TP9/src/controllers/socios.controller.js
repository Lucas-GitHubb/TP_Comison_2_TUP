const pool = require('../config/DB');

// Obtener todos los socios
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM socios ORDER BY id DESC';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un socio por ID
exports.getById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM socios WHERE id = ?';
  pool.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Socio no encontrado' });
    res.json(results[0]);
  });
};

// Crear socio
exports.create = (req, res) => {
  const { nombre, dni, telefono, email } = req.body;
  if (!nombre || !dni) {
    return res.status(400).json({ error: 'El nombre y DNI son obligatorios' });
  }

  const sql = 'INSERT INTO socios (nombre, dni, telefono, email) VALUES (?,?,?,?)';
  pool.query(sql, [nombre, dni, telefono, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, dni });
  });
};

// Actualizar socio
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, dni, telefono, email } = req.body;
  const sql =
    'UPDATE socios SET nombre = ?, dni = ?, telefono = ?, email = ? WHERE id = ?';

  pool.query(sql, [nombre, dni, telefono, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Socio no encontrado' });
    res.json({ ok: true, mensaje: 'Socio actualizado correctamente' });
  });
};

// Eliminar socio
exports.remove = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM socios WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Socio no encontrado' });
    res.json({ ok: true, mensaje: 'Socio eliminado correctamente' });
  });
};