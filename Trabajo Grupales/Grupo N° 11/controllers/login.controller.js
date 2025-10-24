import pool from "../config/DB.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { comparePassword } from "../utils/hash.utils.js";

dotenv.config();

const login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM socios WHERE email = ? AND contrasena = ?', [email, contrasena]);
        if (!rows.length) return res.status(401).json({ message: 'Credenciales inválidas' });
        const compare = await comparePassword(contrasena, rows[0].contrasena);
        if (!compare) return res.status(401).json({ message: 'Credenciales inválidas' });

        const user = rows[0];
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ 
            message: 'Login exitoso', 
            token,
            user: { id: user.id, nombre: user.nombre, email: user.email }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export { login };