// src/utils/jwt.utils.js

import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

const JWT_SECRET = process.env.JWT_SECRET;

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '1h' } // Token expira en 1 hora
    );
};