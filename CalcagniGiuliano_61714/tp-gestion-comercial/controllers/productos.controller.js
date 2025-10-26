import { pool } from "../config/DB.js";

export const listar = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, pr.nombre as proveedor FROM productos p LEFT JOIN proveedores pr ON p.id_proveedor = pr.id ORDER BY p.id DESC`
  );
  res.json(rows);
};

export const obtener = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM productos WHERE id=?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
};

export const crear = async (req, res) => {
  const { nombre, precio, id_proveedor, stock_minimo } = req.body;
  const [r] = await pool.query(
    "INSERT INTO productos (nombre, precio, id_proveedor, stock_minimo) VALUES (?,?,?,?)",
    [nombre, precio, id_proveedor, stock_minimo]
  );
  res
    .status(201)
    .json({ id: r.insertId, nombre, precio, id_proveedor, stock_minimo });
};

export const actualizar = async (req, res) => {
  const { nombre, precio, id_proveedor, stock_minimo } = req.body;
  await pool.query(
    "UPDATE productos SET nombre=?, precio=?, id_proveedor=?, stock_minimo=? WHERE id=?",
    [nombre, precio, id_proveedor, stock_minimo, req.params.id]
  );
  res.json({ ok: true });
};

export const eliminar = async (req, res) => {
  await pool.query("DELETE FROM productos WHERE id=?", [req.params.id]);
  res.json({ ok: true });
};
