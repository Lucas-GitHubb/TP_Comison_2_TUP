import { pool } from "../config/DB.js";

export const getProductos = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM productos");
  res.json(rows);
};

export const obtenerProductoPorId = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM productos WHERE id=?", [req.params.id]);
  res.json(rows[0]);
};

export const crearProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;
  await pool.query("INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)", [nombre, precio, stock]);
  res.json({ mensaje: "Producto creado correctamente" });
};

export const actualizarProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;
  await pool.query("UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?", [nombre, precio, stock, req.params.id]);
  res.json({ mensaje: "Producto actualizado correctamente" });
};

export const borrarProducto = async (req, res) => {
  await pool.query("DELETE FROM productos WHERE id=?", [req.params.id]);
  res.json({ mensaje: "Producto eliminado correctamente" });
};
