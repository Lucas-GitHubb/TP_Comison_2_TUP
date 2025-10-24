import pool from '../config/db.js';

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductoId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
    if (rows.lenght === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, cantidad } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, categoria, cantidad) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, categoria, cantidad]
    );
    res.status(201).json({ id: rows.insertId, nombre, descripcion, categoria, cantidad });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria, cantidad } = req.body;
    const [rows] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, categoria = ?, cantidad = ? WHERE id_producto = ?',
      [nombre, descripcion, categoria, cantidad, id]
    );
    if (rows.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    if (rows.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
