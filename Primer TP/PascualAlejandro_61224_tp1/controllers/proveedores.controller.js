import { pool } from "../config/db.js";

export async function list(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, cuit, email, telefono, direccion, creado_en FROM proveedores ORDER BY nombre"
    );
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, cuit, email, telefono, direccion, creado_en FROM proveedores WHERE id=:id",
      { id: req.params.id }
    );
    if (!rows.length) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const { nombre, cuit, email, telefono, direccion } = req.body;
    const [result] = await pool.query(
      `INSERT INTO proveedores (nombre, cuit, email, telefono, direccion)
       VALUES (:nombre, :cuit, :email, :telefono, :direccion)`,
      { nombre, cuit, email, telefono, direccion }
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const { nombre, cuit, email, telefono, direccion } = req.body;
    const [result] = await pool.query(
      `UPDATE proveedores SET
        nombre=COALESCE(:nombre, nombre),
        cuit=COALESCE(:cuit, cuit),
        email=COALESCE(:email, email),
        telefono=COALESCE(:telefono, telefono),
        direccion=COALESCE(:direccion, direccion)
       WHERE id=:id`,
      { id: req.params.id, nombre, cuit, email, telefono, direccion }
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ updated: true });
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM proveedores WHERE id=:id", { id: req.params.id });
    if (!result.affectedRows) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
