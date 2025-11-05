import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_super_secreta_123"; // luego lo pasás a un .env

// Registro de usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el email ya existe
    const [existe] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existe.length > 0)
      return res.status(400).json({ message: "El email ya está registrado" });

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hash]
    );

    res.status(201).json({ message: "Usuario registrado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const usuario = rows[0];

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};