import { pool } from "../config/DB.js";

export const getProveedores = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM proveedores");
  res.json(rows);
};

export const obtenerProveedorPorId = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM proveedores WHERE id=?", [req.params.id]);
  res.json(rows[0]);
};

export const crearProveedor = async (req, res) => {
  const { nombre, contacto } = req.body;
  await pool.query("INSERT INTO proveedores (nombre, contacto) VALUES (?, ?)", [nombre, contacto]);
  res.json({ mensaje: "Proveedor creado correctamente" });
};

export const actualizarProveedor = async (req, res) => {
  const { nombre, contacto } = req.body;
  await pool.query("UPDATE proveedores SET nombre=?, contacto=? WHERE id=?", [nombre, contacto, req.params.id]);
  res.json({ mensaje: "Proveedor actualizado correctamente" });
};

export const borrarProveedor = async (req, res) => {
  await pool.query("DELETE FROM proveedores WHERE id=?", [req.params.id]);
  res.json({ mensaje: "Proveedor eliminado correctamente" });
};
