import pool from "../config/db.js";

// Asociar artista a evento
export const asociarArtistaAEvento = async (req, res) => {
  try {
    const { id_evento, id_artista } = req.body;

    // Validación básica
    if (!id_evento || !id_artista) {
      return res.status(400).json({ message: "Faltan datos: id_evento o id_artista." });
    }

    // Insertar en la tabla intermedia
    const [result] = await pool.query(
      "INSERT INTO evento_artista (id_evento, id_artista) VALUES (?, ?)",
      [id_evento, id_artista]
    );

    res.status(201).json({
      message: "✅ Artista asociado al evento correctamente.",
      data: { id_evento, id_artista },
    });
  } catch (error) {
    console.error("Error al asociar artista a evento:", error);
    res.status(500).json({
      message: "Error del servidor al asociar artista a evento.",
      error: error.message,
    });
  }
};
