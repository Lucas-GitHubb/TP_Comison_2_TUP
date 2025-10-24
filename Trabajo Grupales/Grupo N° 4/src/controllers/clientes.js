// src/controllers/clientes.controller.js
import { query } from '../config/dataBase.js';

// ------------------------------------------------------------------
// 1. CREAR CLIENTE (POST /api/clientes)
// ------------------------------------------------------------------
export const createCliente = async (req, res) => {
    // El ID del empleado logueado viene del middleware verifyToken (JWT)
    const user_id = req.user.id; 
    
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).json({ message: 'Nombre y apellido son requeridos.' });
    }

    try {
        const result = await query(
            'INSERT INTO Clientes (user_id, nombre, apellido, telefono) VALUES (?, ?, ?, ?)',
            [user_id, nombre, apellido, telefono]
        );
        
        res.status(201).json({ 
            message: 'Cliente creado exitosamente.', 
            id: result.insertId,
            creadoPor: user_id
        });

    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// ------------------------------------------------------------------
// 2. LISTAR TODOS LOS CLIENTES DEL EMPLEADO LOGUEADO (GET /api/clientes)
// ------------------------------------------------------------------
export const getClientes = async (req, res) => {
    const user_id = req.user.id; // ID del empleado logueado

    try {
        // Traer solo los clientes que pertenecen al user_id actual
        const clientes = await query('SELECT id, nombre, apellido, telefono FROM Clientes WHERE user_id = ?', [user_id]);
        
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al listar clientes:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// ------------------------------------------------------------------
// 3. OBTENER UN CLIENTE POR ID (GET /api/clientes/:id)
// ------------------------------------------------------------------
export const getClienteById = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id; // ID del empleado logueado

    try {
        // CRÍTICO: Buscar el cliente por su ID Y que pertenezca al user_id logueado
        const clientes = await query('SELECT id, nombre, apellido, telefono FROM Clientes WHERE id = ? AND user_id = ?', [id, user_id]);
        
        if (clientes.length === 0) {
            // Error 404 si no existe O si no pertenece a este usuario
            return res.status(404).json({ message: 'Cliente no encontrado o no autorizado.' });
        }

        res.status(200).json(clientes[0]);
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// ------------------------------------------------------------------
// 4. ACTUALIZAR CLIENTE (PUT /api/clientes/:id)
// ------------------------------------------------------------------
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id; // ID del empleado logueado
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).json({ message: 'Nombre y apellido son requeridos para la actualización.' });
    }

    try {
        // CRÍTICO: Actualizar solo si el cliente pertenece al user_id logueado
        const result = await query(
            'UPDATE Clientes SET nombre = ?, apellido = ?, telefono = ? WHERE id = ? AND user_id = ?',
            [nombre, apellido, telefono, id, user_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado o no autorizado para actualizar.' });
        }

        res.status(200).json({ message: 'Cliente actualizado correctamente.' });

    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// ------------------------------------------------------------------
// 5. ELIMINAR CLIENTE (DELETE /api/clientes/:id)
// ------------------------------------------------------------------
export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id; // ID del empleado logueado

    try {
        // CRÍTICO: Eliminar solo si el cliente pertenece al user_id logueado
        const result = await query('DELETE FROM Clientes WHERE id = ? AND user_id = ?', [id, user_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado o no autorizado para eliminar.' });
        }

        res.status(200).json({ message: 'Cliente eliminado correctamente.' });

    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};