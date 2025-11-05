import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import pool from '../config/DB.js';

const claveSecreta = process.env.JWT_SECRET;

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!claveSecreta) return res.status(500).json({ message: 'Clave secreta no configurada' });
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' }); 
    jwt.verify(token, claveSecreta, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

export { autenticarToken };