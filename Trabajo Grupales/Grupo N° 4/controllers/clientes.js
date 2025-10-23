const { pool } = require('../config/dataBase.js');

const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

const getClienteId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

const createCliente = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    if (!nombre || !telefono) {
      return res.status(400).json({ message: 'Nombre y telÃ©fono son requeridos' });
    }

    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
      [nombre, telefono, email]
    );
    res.status(201).json({ id: result.insertId, nombre, telefono, email });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET nombre=?, telefono=?, email=? WHERE id=?',
      [nombre, telefono, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ id, nombre, telefono, email });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM clientes WHERE id=?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};

module.exports = {
  getClientes,
  getClienteId,
  createCliente,
  updateCliente,
  deleteCliente,
};
