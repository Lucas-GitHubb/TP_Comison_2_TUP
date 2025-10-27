import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { recuperarcontraseña } from '../services/email.services.js';
import pool from '../config/DB.js';
import { hashPassword } from '../utils/hash.utils.js';

const solicitarRecuperacion = async (req, res) => {
    const { email } = req.body;
    try {
        const [rows] = await pool.query('SELECT id FROM socios WHERE email = ?', [email]);
        if (!rows.length) return res.status(404).json({ message: 'Email no encontrado' });
        const user = rows[0];
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const link = `http://localhost:3000/api/auth/reset-password?token=${token}`;
        await recuperarcontraseña(email, link);
        res.status(200).json({ message: 'Email de recuperación enviado' });
    } catch (error) {
        console.error('Error en solicitarRecuperacion:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

const resetear= async (req, res) => {
    const { token, nuevaContraseña } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await hashPassword(nuevaContraseña);
        const [result] = await pool.query('UPDATE socios SET contrasena = ? WHERE id = ?', [hashedPassword, decoded.id]);
        if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export { solicitarRecuperacion, resetear };