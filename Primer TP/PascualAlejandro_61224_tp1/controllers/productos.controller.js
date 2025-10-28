import { pool } from "../config/db.js";

export async function list(req, res, next) {
  try {
    const q = `
      SELECT p.id, p.codigo, p.nombre, p.precio, p.costo, p.stock,
             p.proveedor_id, pr.nombre AS proveedor
      FROM productos p
      LEFT JOIN proveedores pr ON pr.id = p.proveedor_id
      ORDER BY p.id DESC`;
    const [rows] = await pool.query(q);
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT id, codigo, nombre, precio, costo, stock, proveedor_id
       FROM productos WHERE id=:id`,
      { id: req.params.id }
    );
    if (!rows.length) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const { codigo, nombre, precio, costo, stock = 0, proveedor_id = null } = req.body;
    const [result] = await pool.query(
      `INSERT INTO productos (codigo, nombre, precio, costo, stock, proveedor_id)
       VALUES (:codigo, :nombre, :precio, :costo, :stock, :proveedor_id)`,
      { codigo, nombre, precio, costo, stock, proveedor_id }
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const { codigo, nombre, precio, costo, stock, proveedor_id } = req.body;
    const [result] = await pool.query(
      `UPDATE productos SET
        codigo=COALESCE(:codigo, codigo),
        nombre=COALESCE(:nombre, nombre),
        precio=COALESCE(:precio, precio),
        costo=COALESCE(:costo, costo),
        stock=COALESCE(:stock, stock),
        proveedor_id=COALESCE(:proveedor_id, proveedor_id)
       WHERE id=:id`,
      { id: req.params.id, codigo, nombre, precio, costo, stock, proveedor_id }
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ updated: true });
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id=:id", { id: req.params.id });
    if (!result.affectedRows) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
