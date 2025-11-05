import pool from "../config/db.js";

export const crearEvento = async (req, res) => {
  try {
    const { nombre, fecha, lugar, cupo_maximo } = req.body;
    const [result] = await pool.query(
      "INSERT INTO eventos (nombre, fecha, lugar, cupo_maximo) VALUES (?, ?, ?, ?)",
      [nombre, fecha, lugar, cupo_maximo]
    );
    res.status(201).json({ message: "Evento creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEventos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM eventos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
