const pool = require('../config/db');

exports.crearServicio = async (req, res) => {
  const { nombre, descripcion, precio_total } = req.body;
  if (!nombre || !precio_total) {
    return res.status(400).json({ error: 'Nombre y precio total son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, precio_total) VALUES (?, ?, ?)',
      [nombre, descripcion, precio_total]
    );
    res.status(201).json({ id: result.insertId, nombre, precio_total });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio', details: error.message });
  }
};