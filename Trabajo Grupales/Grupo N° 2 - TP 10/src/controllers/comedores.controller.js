import db from '../config/db.js';
// prueba Marcos
export const getAllComedores = async (req, res) => {
  const query = `SELECT * FROM comedores`;

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener los comedores', err);
    res.status(500).json({ error: 'Error al obtener comedores' });
  }
};

export const getUnComedor = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM comedores WHERE id = ?`;

  try {
    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Comedor no encontrado' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('Error al obtener el comedor', err);
    res.status(500).json({ error: 'Error al obtener el comedor' });
  }
};

export const deleteUnComedor = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM comedores WHERE id = ?`;

  try {
    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'No fue posible dar de baja' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('Error al dar de baja', err);
    res.status(500).json({ error: 'Error al dar de baja' });
  }
};

export const createNewComedor = async (req, res) => {
  const { nombre, direccion, contacto, telefono } = req.body;

  const query = `
    INSERT INTO comedores (nombre, direccion, contacto, telefono)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(query, [nombre, direccion, contacto, telefono]);

    res.status(201).json({
      message: 'Comedor creado correctamente',
      comedorId: result.insertId,
    });
  } catch (err) {
    console.error('Error al dar de alta', err);
    res.status(500).json({ error: 'Error al dar de alta' });
  }
};

export const modificateComedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, contacto, telefono } = req.body;

  const query = `
    UPDATE comedores
    SET nombre = ?, direccion = ?, contacto = ?, telefono = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db.query(query, [nombre, direccion, contacto, telefono, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comedor no encontrado' });
    }

    res.status(200).json({
      message: 'Comedor modificado correctamente',
    });
  } catch (err) {
    console.error('Error al modificar el comedor', err);
    res.status(500).json({ error: 'Error al modificar el comedor' });
  }
};
