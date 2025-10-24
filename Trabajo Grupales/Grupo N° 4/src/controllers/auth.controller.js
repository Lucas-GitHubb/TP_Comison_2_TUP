// src/controllers/auth.controller.js
// Contiene la lógica de autenticación completa.

import { hashPassword, comparePassword } from '../utils/hash.utils.js';
import { generateAccessToken } from '../utils/jwt.utils.js';
import { query } from '../config/dataBase.js';
// Módulos que usará Germán:
import { sendEmail } from '../services/email.service.js';
import jwt from 'jsonwebtoken'; 

// === PARTE DE FRANCO: REGISTRO Y LOGIN ===

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Faltan campos.' });
    try {
        const existingUser = await query('SELECT id FROM Users WHERE email = ?', [email]);
        if (existingUser.length > 0) return res.status(400).json({ message: 'El correo ya está registrado.' });
        
        // 1. HASHEAR (Bcrypt)
        const hashedPassword = await hashPassword(password);
        const result = await query(
            'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        const userId = result.insertId;

        // 2. Generar JWT
        const token = generateAccessToken({ id: userId });
        res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ message: 'Error interno al registrar.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Debe ingresar email y contraseña.' });
    try {
        const users = await query('SELECT id, password FROM Users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) return res.status(401).json({ message: 'Credenciales inválidas.' });

        // 1. COMPARAR (Bcrypt)
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas.' });

        // 2. Generar JWT
        const token = generateAccessToken({ id: user.id });
        res.status(200).json({ message: 'Login exitoso.', token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
}