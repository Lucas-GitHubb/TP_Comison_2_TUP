// src/middlewares/auth.middleware.js
// Middleware para proteger rutas (REQUISITO TP).

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET; 

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere un token Bearer.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Adjunta el ID del usuario logueado
        req.user = decoded; 

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado. Acceso no autorizado.' });
    }
};