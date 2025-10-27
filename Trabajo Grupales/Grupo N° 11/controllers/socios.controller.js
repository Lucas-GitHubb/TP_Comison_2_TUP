import pool from '../config/DB.js';
import { hashPassword } from '../utils/hash.utils.js';

export const listar = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM socios ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtener = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM socios WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Socio no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crear = async (req, res) => {
    const { nombre, dni, telefono, email, contrasena } = req.body;
    
    if (!nombre || !dni) return res.status(400).json({ error: 'Nombre y DNI son requeridos' });
    try {
        const hashedPassword = await hashPassword(contrasena);
        const [result] = await pool.query(
            'INSERT INTO socios (nombre, dni, telefono, email, contrasena) VALUES (?, ?, ?, ?, ?)',
            [nombre, dni, telefono || null, email || null, hashedPassword]
        );
        res.status(201).json({ id: result.insertId, nombre, dni });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const actualizar = async (req, res) => {
    const { nombre, dni, telefono, email, contrasena } = req.body;
    try {
        const hashedPassword = contrasena ? await hashPassword(contrasena) : undefined;
        const [result] = await pool.query(
            'UPDATE socios SET nombre=?, dni=?, telefono=?, email=?, contrasena=? WHERE id=?',
            [nombre, dni, telefono, email, hashedPassword || contrasena, req.params.id]
        );
        if (!result.affectedRows) return res.status(404).json({ error: 'Socio no encontrado' });
        res.json({ mensaje: 'Socio actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const eliminar = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM socios WHERE id=?', [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({ error: 'Socio no encontrado' });
        res.json({ mensaje: 'Socio eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
