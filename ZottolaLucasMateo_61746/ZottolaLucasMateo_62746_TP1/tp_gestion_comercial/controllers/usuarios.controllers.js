import { pool } from "../config/DB.js";

export const getUsuarios = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  res.json(rows);
};

export const obtenerUsuarioPorId = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
};

export const crearUsuario = async (req, res) => {
  const { nombre, apellido, rol } = req.body;
  await pool.query("INSERT INTO usuarios (nombre, apellido, rol) VALUES (?, ?, ?)", [nombre, apellido, rol]);
  res.json({ mensaje: "Usuario creado correctamente" });
};

export const actualizarUsuario = async (req, res) => {
  const { nombre, apellido, rol } = req.body;
  await pool.query("UPDATE usuarios SET nombre=?, apellido=?, rol=? WHERE id=?", [nombre, apellido, rol, req.params.id]);
  res.json({ mensaje: "Usuario actualizado correctamente" });
};

export const borrarUsuario = async (req, res) => {
  await pool.query("DELETE FROM usuarios WHERE id=?", [req.params.id]);
  res.json({ mensaje: "Usuario eliminado correctamente" });
};
