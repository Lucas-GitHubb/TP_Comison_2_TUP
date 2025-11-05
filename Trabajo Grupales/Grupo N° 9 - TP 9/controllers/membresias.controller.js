import pool from '../config/DB.js';

export const listar = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT m.id, s.nombre AS socio, d.nombre AS deporte, m.fecha_inicio
        FROM membresias m
        JOIN socios s ON s.id = m.socio_id
        JOIN deportes d ON d.id = m.deporte_id
        ORDER BY m.id DESC
      `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtener = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT m.*, s.nombre AS socio, d.nombre AS deporte
        FROM membresias m
        JOIN socios s ON s.id = m.socio_id
        JOIN deportes d ON d.id = m.deporte_id
        WHERE m.id = ?
      `, [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Membresía no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crear = async (req, res) => {
    const { socio_id, deporte_id } = req.body;
    if (!socio_id || !deporte_id)
        return res.status(400).json({ error: 'socio_id y deporte_id son requeridos' });
    try {
        const [result] = await pool.query(
            'INSERT INTO membresias (socio_id, deporte_id, fecha_inicio) VALUES (?, ?, NOW())',
            [socio_id, deporte_id]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const eliminar = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM membresias WHERE id=?', [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({ error: 'Membresía no encontrada' });
        res.json({ mensaje: 'Membresía eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
