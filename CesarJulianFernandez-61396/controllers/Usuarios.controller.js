
const { pool } = require('../config/db');

exports.obtenerTodos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre, apellido, email, rol FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre, apellido, email, rol FROM usuarios WHERE id_usuario = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.crearUsuario = async (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    if (!nombre || !email || !rol) {
        return res.status(400).json({ message: 'Nombre, email y rol son obligatorios.' });
    }
    try {
        const sql = 'INSERT INTO usuarios (nombre, apellido, email, rol) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(sql, [nombre, apellido, email, rol]);
        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            id: result.insertId 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, rol } = req.body;
    try {
        const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, rol = ? WHERE id_usuario = ?';
        const [result] = await pool.query(sql, [nombre, apellido, email, rol, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o sin cambios.' });
        }
        res.json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        // Manejo de la restricción de clave foránea si el usuario tiene ventas asociadas
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar: el usuario tiene ventas registradas.' });
        }
        
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};