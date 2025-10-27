import pool from '../config/DB.js';

export const listar = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deportes ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtener = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deportes WHERE id=?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Deporte no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crear = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
    try {
        const [result] = await pool.query(
            'INSERT INTO deportes (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion || null]
        );
        res.status(201).json({ id: result.insertId, nombre, descripcion });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const actualizar = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE deportes SET nombre=?, descripcion=? WHERE id=?',
            [nombre, descripcion, req.params.id]
        );
        if (!result.affectedRows) return res.status(404).json({ error: 'Deporte no encontrado' });
        res.json({ mensaje: 'Deporte actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const eliminar = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM deportes WHERE id=?', [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({ error: 'Deporte no encontrado' });
        res.json({ mensaje: 'Deporte eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
