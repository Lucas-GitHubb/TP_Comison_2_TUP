// controllers/proveedores.controller.js
const { pool } = require('../config/db');

exports.obtenerTodos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener proveedor por ID:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.crearProveedor = async (req, res) => {
    const { nombre_empresa, contacto, telefono, email } = req.body;
    if (!nombre_empresa) {
        return res.status(400).json({ message: 'El nombre de la empresa es obligatorio.' });
    }
    try {
        const sql = 'INSERT INTO proveedores (nombre_empresa, contacto, telefono, email) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(sql, [nombre_empresa, contacto, telefono, email]);
        res.status(201).json({ 
            message: 'Proveedor creado con éxito', 
            id: result.insertId 
        });
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.actualizarProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre_empresa, contacto, telefono, email } = req.body;
    if (!nombre_empresa) {
        return res.status(400).json({ message: 'El nombre de la empresa es obligatorio.' });
    }
    try {
        const sql = 'UPDATE proveedores SET nombre_empresa = ?, contacto = ?, telefono = ?, email = ? WHERE id_proveedor = ?';
        const [result] = await pool.query(sql, [nombre_empresa, contacto, telefono, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado o sin cambios.' });
        }
        res.json({ message: 'Proveedor actualizado con éxito' });
    } catch (error) {
        console.error("Error al actualizar proveedor:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.eliminarProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado.' });
        }
        
        // Manejar la restricción de clave foránea si el proveedor tiene productos asociados.
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar: el proveedor tiene productos asociados.' });
        }

        res.json({ message: 'Proveedor eliminado con éxito' });
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};