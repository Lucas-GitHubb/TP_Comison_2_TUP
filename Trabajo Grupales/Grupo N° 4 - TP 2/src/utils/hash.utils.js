// src/utils/hash.utils.js
// Implementación de Bcrypt para el hash de contraseñas

import bcrypt from 'bcrypt'; 

const SALT_ROUNDS = 10; 

export const hashPassword = async (password) => { 
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => { 
    return await bcrypt.compare(password, hashedPassword);
};