import pool from '../config/DB.js';

export const obtenerProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener proveedor por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearProveedor = async (req, res) => {
    const { nombre, contacto, telefono, email, direccion } = req.body;

    if (!nombre || !contacto || !telefono) {
        return res.status(400).json({ message: 'Faltan campos obligatorios (nombre, contacto, telefono)' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre, contacto, telefono, email || null, direccion || null]
        );
        res.status(201).json({
            message: 'Proveedor creado exitosamente',
            id: result.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre, contacto, telefono, email, direccion } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
            [nombre, contacto, telefono, email || null, direccion || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado para actualizar' });
        }

        const [updatedProvider] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id]);
        res.json({ message: 'Proveedor actualizado', proveedor: updatedProvider[0] });

    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar el proveedor porque está referenciado en otras tablas (ej: productos).' });
         }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};