import { pool } from "../config/DB.js";

export const getVentas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM ventas");
  res.json(rows);
};

export const obtenerVentaPorId = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM ventas WHERE id=?", [req.params.id]);
  res.json(rows[0]);
};

export const crearVenta = async (req, res) => {
  const { id_usuario, id_producto, cantidad, total } = req.body;
  await pool.query(
    "INSERT INTO ventas (id_usuario, id_producto, cantidad, total) VALUES (?, ?, ?, ?)",
    [id_usuario, id_producto, cantidad, total]
  );
  res.json({ mensaje: "Venta registrada correctamente" });
};

export const borrarVenta = async (req, res) => {
  await pool.query("DELETE FROM ventas WHERE id=?", [req.params.id]);
  res.json({ mensaje: "Venta eliminada correctamente" });
};
