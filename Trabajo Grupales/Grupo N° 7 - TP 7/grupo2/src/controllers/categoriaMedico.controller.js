import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verificarToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!secretKey) {
        console.error('Error: JWT_SECRET no está definida en el archivo .env');
        res.status(500).json({ message: 'Error interno del servidor: Falta configuración de seguridad.' });
        return null;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado o formato incorrecto.' });
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('Error de token:', error.message);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Acceso no autorizado. Token expirado.' });
        } else if (error.name === 'JsonWebTokenError') {
             res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
        } else {
             res.status(401).json({ message: 'Acceso no autorizado. Error al verificar token.' });
        }
        return null;
    }
};

export const obtenerCategoriasMedico = async (req, res) => {
    const usuarioAutenticado = verificarToken(req, res);
    if (!usuarioAutenticado) return;

    try {
        const obtenerCategorias = 'SELECT idCatMedico, NombreCat FROM catMedicos WHERE isActive = 1';
        db.query(obtenerCategorias, (error, results) => {
            if (error) {
                console.error('Error al obtener las categorias de medicos:', error);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Error al obtener las categorias de medicos' });
                }
            }
            if (!res.headersSent) {
                 res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error('Error al obtener las categorias de medicos:', error);
         if (!res.headersSent) {
            res.status(500).json({ error: 'Error al obtener las categorias de medicos' });
         }
    }
};

export const obtenerCategoriaMedicoPorId = async (req, res) => {
    const usuarioAutenticado = verificarToken(req, res);
    if (!usuarioAutenticado) return;

    try {
        const { idCatMedico } = req.params;
        const obtenerCategoria = 'SELECT idCatMedico, NombreCat FROM catMedicos WHERE idCatMedico = ? AND isActive = 1';
        db.query(obtenerCategoria, [idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al obtener la categoria de medico:', error);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Error al obtener la categoria de medico' });
                }
            }
             if (!res.headersSent) {
                 if (results.length === 0) {
                     return res.status(404).json({ message: 'Categoría no encontrada o inactiva.' });
                 }
                res.status(200).json(results[0]);
            }
        });
    } catch (error) {
        console.error('Error al obtener la categoria de medico:', error);
        if (!res.headersSent) {
             res.status(500).json({ error: 'Error al obtener la categoria de medico' });
        }
    }
};

export const crearCategoriaMedico = async (req, res) => {
    const usuarioAutenticado = verificarToken(req, res);
    if (!usuarioAutenticado) return;

    if (usuarioAutenticado.role !== 'Admin') {
         return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }

    try {
        const { NombreCat } = req.body;

        if (!NombreCat) {
            return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
        }

        const crearCategoria = 'INSERT INTO catMedicos (NombreCat) VALUES (?)';
        db.query(crearCategoria, [NombreCat], (error, results) => {
            if (error) {
                console.error('Error al crear la categoria de medico:', error);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Error al crear la categoria de medico' });
                }
            }
            if (!res.headersSent) {
                res.status(201).json({
                    message: 'Categoria de medico creada exitosamente',
                    idCatMedico: results.insertId
                });
            }
        });
    } catch (error) {
        console.error('Error al crear la categoria de medico:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error al crear la categoria de medico' });
        }
    }
};

export const modificarCategoriaMedico = async (req, res) => {
    const usuarioAutenticado = verificarToken(req, res);
    if (!usuarioAutenticado) return;

    if (usuarioAutenticado.role !== 'Admin') {
         return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }

    try {
        const { idCatMedico } = req.params;
        const { NombreCat } = req.body;

        if (!NombreCat) {
            return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
        }
        if (!idCatMedico) {
             return res.status(400).json({ error: 'Falta el ID de la categoría en la URL.' });
        }

        const actualizarCategoria = 'UPDATE catMedicos SET NombreCat = ? WHERE idCatMedico = ? AND isActive = 1';
        db.query(actualizarCategoria, [NombreCat, idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al modificar la categoria de medico:', error);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Error al modificar la categoria de medico' });
                }
            }
             if (!res.headersSent) {
                 if (results.affectedRows === 0) {
                     return res.status(404).json({ message: 'Categoría no encontrada o inactiva.' });
                 }
                res.status(200).json({ message: 'Categoria de medico modificada exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error al modificar la categoria de medico:', error);
         if (!res.headersSent) {
            res.status(500).json({ error: 'Error al modificar la categoria de medico' });
         }
    }
};

export const borradoLogicoCategoriaMedico = async (req, res) => {
    const usuarioAutenticado = verificarToken(req, res);
    if (!usuarioAutenticado) return;

    if (usuarioAutenticado.role !== 'Admin') {
         return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }

    try {
        const { idCatMedico } = req.params;

        if (!idCatMedico) {
            return res.status(400).json({ error: 'Falta el ID de la categoría en la URL.' });
        }

        const borrarCategoria = 'UPDATE catMedicos SET isActive = 0 WHERE idCatMedico = ? AND isActive = 1';
        db.query(borrarCategoria, [idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al borrar la categoria de medico:', error);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Error al borrar la categoria de medico' });
                }
            }
            if (!res.headersSent) {
                if (results.affectedRows === 0) {
                     return res.status(404).json({ message: 'Categoría no encontrada o ya inactiva.' });
                 }
                res.status(200).json({ message: 'Categoria de medico borrada (lógicamente) exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error al borrar la categoria de medico:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error al borrar la categoria de medico' });
        }
    }
};