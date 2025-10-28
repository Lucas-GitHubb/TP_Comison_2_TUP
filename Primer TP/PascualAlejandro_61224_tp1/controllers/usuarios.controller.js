import { pool } from "../config/db.js";

export async function list(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, email, rol, activo, creado_en FROM usuarios ORDER BY id DESC LIMIT :limit OFFSET :offset",
      { limit, offset }
    );
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, email, rol, activo, creado_en FROM usuarios WHERE id=:id",
      { id: req.params.id }
    );
    if (!rows.length) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const { nombre, apellido, email, rol = "empleado", activo = 1 } = req.body;
    const [result] = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, email, rol, activo)
       VALUES (:nombre, :apellido, :email, :rol, :activo)`,
      { nombre, apellido, email, rol, activo }
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const { nombre, apellido, email, rol, activo } = req.body;
    const [result] = await pool.query(
      `UPDATE usuarios SET
        nombre=COALESCE(:nombre, nombre),
        apellido=COALESCE(:apellido, apellido),
        email=COALESCE(:email, email),
        rol=COALESCE(:rol, rol),
        activo=COALESCE(:activo, activo)
       WHERE id=:id`,
      { id: req.params.id, nombre, apellido, email, rol, activo }
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ updated: true });
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id=:id", { id: req.params.id });
    if (!result.affectedRows) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
