import pool from "../config/db.js";

// Crear artista
export const crearArtistas = async (req, res) => {
  try {
    const { nombre, genero } = req.body;

    const [result] = await pool.query(
      "INSERT INTO artistas (nombre, genero) VALUES (?, ?)",
      [nombre, genero]
    );

    res.status(201).json({ message: "Artista creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los artistas
export const obtenerArtistas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM artistas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};