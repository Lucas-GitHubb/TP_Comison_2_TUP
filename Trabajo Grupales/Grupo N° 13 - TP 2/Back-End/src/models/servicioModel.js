import { pool } from '../config/DB.js';

export async function crearServicio({ nombre, precio, duracion_min = 30 }) {
  const [r] = await pool.execute(
    `INSERT INTO servicios (nombre, precio, duracion_min) VALUES (:nombre, :precio, :duracion_min)`,
    { nombre, precio, duracion_min }
  );
  return { id: r.insertId, nombre, precio, duracion_min };
}

export async function listarServicios() {
  const [rows] = await pool.execute(`SELECT * FROM servicios ORDER BY id DESC`);
  return rows;
}

export async function obtenerServicio(id) {
  const [rows] = await pool.execute(`SELECT * FROM servicios WHERE id = :id`, { id });
  return rows[0] || null;
}

export async function actualizarServicio(id, { nombre, precio, duracion_min }) {
  await pool.execute(
    `UPDATE servicios SET nombre = :nombre, precio = :precio, duracion_min = :duracion_min WHERE id = :id`,
    { id, nombre, precio, duracion_min }
  );
  return obtenerServicio(id);
}