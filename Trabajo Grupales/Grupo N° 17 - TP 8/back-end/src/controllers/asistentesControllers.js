import pool from "../config/db.js";

// Crear asistente
export const crearAsistente = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({ error: "Nombre y email son obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO asistentes (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );

    res.status(201).json({ message: "Asistente creado", id: result.insertId });
  } catch (error) {
    // Evita mostrar errores de SQL directamente
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "El email ya está registrado" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Obtener todos los asistentes
export const obtenerAsistentes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM asistentes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un asistente por ID
export const obtenerAsistentePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM asistentes WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Asistente no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar asistente
export const eliminarAsistente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM asistentes WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Asistente no encontrado" });

    res.json({ message: "Asistente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
