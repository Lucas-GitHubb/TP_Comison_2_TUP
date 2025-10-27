// controllers/metricas.controller.js
const { pool } = require('../config/db');

/**
 * Métrica 1: Top 5 de vendedores por monto total de ventas.
 * Endpoint: GET /api/metricas/top-vendedores
 */
exports.topVendedores = async (req, res) => {
    try {
        const sql = `
            SELECT 
                u.id_usuario,
                u.nombre, 
                u.apellido, 
                COUNT(v.id_venta) AS total_ventas,
                SUM(v.total_venta) AS monto_total_vendido
            FROM 
                ventas v
            JOIN 
                usuarios u ON v.id_usuario = u.id_usuario
            GROUP BY 
                u.id_usuario, u.nombre, u.apellido
            ORDER BY 
                monto_total_vendido DESC
            LIMIT 5;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error en métrica Top Vendedores:", error);
        res.status(500).json({ message: 'Error al obtener Top Vendedores.' });
    }
};

/**
 * Métrica 2: Productos con stock bajo (crítico).
 * Endpoint: GET /api/metricas/stock-critico
 */
exports.stockCritico = async (req, res) => {
    try {
        // Buscamos productos con stock muy bajo (ej: <= 10)
        const [rows] = await pool.query(`
            SELECT 
                id_producto,
                nombre, 
                stock, 
                precio_venta, 
                id_proveedor
            FROM 
                productos
            WHERE 
                stock <= 10
            ORDER BY 
                stock ASC;
        `);
        res.json(rows);
    } catch (error) {
        console.error("Error en métrica Stock Crítico:", error);
        res.status(500).json({ message: 'Error al obtener Stock Crítico.' });
    }
};

/**
 * Métrica 3: Suma total de ventas por día (últimos 30 días).
 * Endpoint: GET /api/metricas/ventas-por-dia
 */
exports.ventasPorDia = async (req, res) => {
    try {
        // Agregamos las ventas de los últimos 30 días
        const sql = `
            SELECT 
                DATE(fecha_venta) AS dia,
                SUM(total_venta) AS total_vendido
            FROM 
                ventas
            WHERE 
                fecha_venta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY 
                dia
            ORDER BY 
                dia DESC;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error en métrica Ventas por Día:", error);
        res.status(500).json({ message: 'Error al obtener Ventas por Día.' });
    }
};