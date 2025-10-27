import pool from "../config/db.js";

export const obtenerInscripciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inscripciones');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inscripciones' });
    }
};

export const crearInscripcion = async (req, res) => {
    const { id_evento, nombre, apellido } = req.body;

    try {
        // Verificamos que el evento exista
        const [evento] = await pool.query('SELECT cupo_maximo FROM eventos WHERE id = ?', [id_evento]);
        if (evento.length === 0) return res.status(404).json({ message: 'Evento no encontrado' });

        // Contamos cuántas inscripciones hay para ese evento
        const [inscripcionesExistentes] = await pool.query(
            'SELECT COUNT(*) as total FROM inscripciones WHERE id_evento = ?',
            [id_evento]
        );

        if (inscripcionesExistentes[0].total >= evento[0].cupo_maximo) {
            return res.status(400).json({ message: 'Cupo máximo alcanzado para este evento' });
        }

        // Insertamos la inscripción
        const [result] = await pool.query(
            'INSERT INTO inscripciones (id_evento, nombre, apellido) VALUES (?, ?, ?)',
            [id_evento, nombre, apellido]
        );

        res.status(201).json({ message: 'Inscripción creada', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear inscripción' });
    }
};
