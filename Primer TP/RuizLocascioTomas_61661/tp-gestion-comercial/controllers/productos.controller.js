import pool from '../config/DB.js';

export const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock_disponible, id_proveedor } = req.body;

    if (!nombre || !precio || !stock_disponible) {
        return res.status(400).json({ message: 'Faltan campos obligatorios (nombre, precio, stock_disponible)' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock_disponible, id_proveedor) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion || null, precio, stock_disponible, id_proveedor || null]
        );
        res.status(201).json({
            message: 'Producto creado exitosamente',
            id: result.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock_disponible, id_proveedor } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock_disponible = ?, id_proveedor = ? WHERE id = ?',
            [nombre, descripcion || null, precio, stock_disponible, id_proveedor || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }

        const [updatedProduct] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        res.json({ message: 'Producto actualizado', producto: updatedProduct[0] });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
         if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar el producto porque está referenciado en otras tablas (ej: ventas).' });
         }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};