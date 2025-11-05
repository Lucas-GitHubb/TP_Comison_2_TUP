const pool = require('../config/db');

exports.crearCliente = async (req, res) => {
  const { nombre, apellido, email } = req.body;
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, apellido, email) VALUES (?, ?, ?)',
      [nombre, apellido, email]
    );
    res.status(201).json({ id: result.insertId, nombre, apellido, email });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente', details: error.message });
  }
};