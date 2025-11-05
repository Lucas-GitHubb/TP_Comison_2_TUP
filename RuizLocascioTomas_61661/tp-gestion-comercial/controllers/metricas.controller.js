import pool from '../config/DB.js';

export const obtenerTotalVentas = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) as cantidad_ventas, SUM(total_venta) as monto_total FROM ventas';
        const [rows] = await pool.query(query);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener total de ventas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerProductoMasVendido = async (req, res) => {
    try {
        const query = `
            SELECT p.nombre as nombre_producto, SUM(dv.cantidad) as total_vendido
            FROM detalles_venta dv
            JOIN productos p ON dv.id_producto = p.id
            GROUP BY dv.id_producto, p.nombre
            ORDER BY total_vendido DESC
            LIMIT 1
        `;
        const [rows] = await pool.query(query);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay datos de ventas para calcular el producto más vendido' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener producto más vendido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerStockProductos = async (req, res) => {
    try {
        const query = 'SELECT nombre, stock_disponible FROM productos ORDER BY stock_disponible ASC';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener stock de productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerCantidadUsuarios = async (req, res) => {
     try {
        const query = 'SELECT COUNT(*) as total_usuarios FROM usuarios';
        const [rows] = await pool.query(query);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener cantidad de usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};