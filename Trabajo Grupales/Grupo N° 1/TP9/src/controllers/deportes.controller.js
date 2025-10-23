const pool = require('../config/DB');

// Obtener todos los deportes
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM deportes ORDER BY id DESC';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un deporte por ID
exports.getById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM deportes WHERE id = ?';
  pool.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Deporte no encontrado' });
    res.json(results[0]);
  });
};

// Crear deporte
exports.create = (req, res) => {
  const { nombre, cuota_mensual } = req.body;
  if (!nombre || cuota_mensual == null) {
    return res.status(400).json({ error: 'El nombre y la cuota_mensual son obligatorios' });
  }

  const sql = 'INSERT INTO deportes (nombre, cuota_mensual) VALUES (?, ?)';
  pool.query(sql, [nombre, cuota_mensual], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, cuota_mensual });
  });
};

// Actualizar deporte
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, cuota_mensual } = req.body;
  const sql = 'UPDATE deportes SET nombre = ?, cuota_mensual = ? WHERE id = ?';
  pool.query(sql, [nombre, cuota_mensual, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Deporte no encontrado' });
    res.json({ ok: true, mensaje: 'Deporte actualizado correctamente' });
  });
};

// Eliminar deporte
exports.remove = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM deportes WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Deporte no encontrado' });
    res.json({ ok: true, mensaje: 'Deporte eliminado correctamente' });
  });
};
