// controllers/productos.controller.js
const { pool } = require('../config/db');

exports.obtenerTodos = async (req, res) => {
    try {
        // Traemos el nombre del proveedor con un JOIN
        const sql = `
            SELECT 
                p.id_producto, p.nombre, p.descripcion, p.precio_costo, p.precio_venta, p.stock, 
                pr.nombre_empresa AS proveedor
            FROM 
                productos p
            LEFT JOIN 
                proveedores pr ON p.id_proveedor = pr.id_proveedor
            ORDER BY p.nombre;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT 
                p.*, pr.nombre_empresa AS proveedor
            FROM 
                productos p
            LEFT JOIN 
                proveedores pr ON p.id_proveedor = pr.id_proveedor
            WHERE p.id_producto = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.crearProducto = async (req, res) => {
    const { nombre, descripcion, precio_costo, precio_venta, stock, id_proveedor } = req.body;
    if (!nombre || !precio_venta || !stock) {
        return res.status(400).json({ message: 'Nombre, precio de venta y stock son obligatorios.' });
    }
    try {
        const sql = 'INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, stock, id_proveedor) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [nombre, descripcion, precio_costo, precio_venta, stock, id_proveedor || null]);
        res.status(201).json({ 
            message: 'Producto creado con éxito', 
            id: result.insertId 
        });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio_costo, precio_venta, stock, id_proveedor } = req.body;
    try {
        const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio_costo = ?, precio_venta = ?, stock = ?, id_proveedor = ? WHERE id_producto = ?';
        const [result] = await pool.query(sql, [nombre, descripcion, precio_costo, precio_venta, stock, id_proveedor || null, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o sin cambios.' });
        }
        res.json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        
        // Manejar la restricción de clave foránea si el producto está en alguna venta histórica.
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar: el producto está asociado a ventas históricas.' });
        }

        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};