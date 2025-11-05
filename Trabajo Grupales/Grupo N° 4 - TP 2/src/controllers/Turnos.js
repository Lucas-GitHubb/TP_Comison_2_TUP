const { pool } = require('../config/dataBase.js');

const getTurnos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.id,
        c.nombre AS cliente,
        s.nombre AS servicio,
        s.precio,
        t.fecha,
        t.hora
      FROM turnos t
      JOIN clientes c ON t.idCliente = c.id
      JOIN servicios s ON t.idServicio = s.id
      ORDER BY t.fecha, t.hora
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ message: 'Error al obtener turnos' });
  }
};

const getTurnoID = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM turnos WHERE id = ?', [id]);
    res.json(rows[0] || null);
  } catch (error) {
    console.error('Error al obtener turno:', error);
    res.status(500).json({ message: 'Error al obtener turno' });
  }
};

const createTurno = async (req, res) => {
  try {
    const { idCliente, idServicio, fecha, hora } = req.body;
    const [result] = await pool.query(
      'INSERT INTO turnos (idCliente, idServicio, fecha, hora) VALUES (?, ?, ?, ?)',
      [idCliente, idServicio, fecha, hora]
    );
    res.status(201).json({ id: result.insertId, idCliente, idServicio, fecha, hora });
  } catch (error) {
    console.error('Error al crear turno:', error);
    res.status(500).json({ message: 'Error al crear turno' });
  }
};

const updateTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { idCliente, idServicio, fecha, hora } = req.body;

    const [result] = await pool.query(
      'UPDATE turnos SET idCliente = ?, idServicio = ?, fecha = ?, hora = ? WHERE id = ?',
      [idCliente, idServicio, fecha, hora, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    res.json({ id, idCliente, idServicio, fecha, hora });
  } catch (error) {
    console.error('Error al actualizar turno:', error);
    res.status(500).json({ message: 'Error al actualizar turno' });
  }
};

const deleteTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM turnos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar turno:', error);
    res.status(500).json({ message: 'Error al eliminar turno' });
  }
};

module.exports = {
  getTurnos,
  getTurnoID,
  createTurno,
  updateTurno,
  deleteTurno
};
