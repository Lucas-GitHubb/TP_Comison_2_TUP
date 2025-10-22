import { pool } from "../config/DB.js";

export const listar = async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM proveedores ORDER BY id DESC");
  res.json(rows);
};

export const obtener = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM proveedores WHERE id=?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
};

export const crear = async (req, res) => {
  const { nombre, cuit } = req.body;
  const [r] = await pool.query(
    "INSERT INTO proveedores (nombre, cuit) VALUES (?,?)",
    [nombre, cuit]
  );
  res.status(201).json({ id: r.insertId, nombre, cuit });
};

export const actualizar = async (req, res) => {
  const { nombre, cuit } = req.body;
  await pool.query("UPDATE proveedores SET nombre=?, cuit=? WHERE id=?", [
    nombre,
    cuit,
    req.params.id,
  ]);
  res.json({ ok: true });
};

export const eliminar = async (req, res) => {
  await pool.query("DELETE FROM proveedores WHERE id=?", [req.params.id]);
  res.json({ ok: true });
};
