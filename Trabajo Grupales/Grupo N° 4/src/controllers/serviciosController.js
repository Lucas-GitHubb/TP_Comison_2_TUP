// controllers/serviciosController.js
const { pool } = require('../config/dataBase.js');

// GET /servicios
const getservicios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM servicios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
};

// GET /servicios/:id
const getserviciosID = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    res.status(500).json({ message: 'Error al obtener servicio' });
  }
};

// POST /servicios/crear
const createservicios = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || precio == null) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }
    if (Number.isNaN(Number(precio))) {
      return res.status(400).json({ message: 'Precio debe ser numérico' });
    }

    const [result] = await pool.query(
      'INSERT INTO servicios (nombre, precio) VALUES (?, ?)',
      [nombre, precio]
    );

    res.status(201).json({ id: result.insertId, nombre, precio });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// PUT /servicios/editar/:id
const updateservicios = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    if (precio != null && Number.isNaN(Number(precio))) {
      return res.status(400).json({ message: 'Precio debe ser numérico' });
    }

    const [result] = await pool.query(
      'UPDATE servicios SET nombre = ?, precio = ? WHERE id = ?',
      [nombre, precio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json({ id, nombre, precio });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// DELETE /servicios/eliminar/:id
const deleteservicios = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM servicios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};

module.exports = {
  getservicios,
  getserviciosID,
  createservicios,
  updateservicios,
  deleteservicios,
};
