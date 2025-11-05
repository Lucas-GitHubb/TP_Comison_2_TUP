import { pool } from '../config/DB.js';

export async function crearCliente({ nombre, telefono, email }) {
  const [r] = await pool.execute(
    `INSERT INTO clientes (nombre, telefono, email) VALUES (:nombre, :telefono, :email)`,
    { nombre, telefono, email }
  );
  return { id: r.insertId, nombre, telefono, email };
}

export async function listarClientes() {
  const [rows] = await pool.execute(`SELECT * FROM clientes ORDER BY id DESC`);
  return rows;
}

export async function obtenerCliente(id) {
  const [rows] = await pool.execute(`SELECT * FROM clientes WHERE id = :id`, { id });
  return rows[0] || null;
}

export async function actualizarCliente(id, { nombre, telefono, email }) {
  await pool.execute(
    `UPDATE clientes SET nombre = :nombre, telefono = :telefono, email = :email WHERE id = :id`,
    { id, nombre, telefono, email }
  );
  return obtenerCliente(id);
}