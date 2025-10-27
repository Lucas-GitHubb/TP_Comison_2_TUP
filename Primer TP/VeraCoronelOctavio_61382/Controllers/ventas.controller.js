// controllers/ventas.controller.js
const { pool } = require('../config/db');

/**
 * Obtiene el listado de todas las ventas (solo la cabecera).
 */
exports.obtenerTodas = async (req, res) => {
    try {
        // Obtenemos la cabecera y el nombre del vendedor
        const sql = `
            SELECT 
                v.id_venta, 
                v.fecha_venta, 
                v.total_venta, 
                CONCAT(u.nombre, ' ', u.apellido) AS vendedor,
                COALESCE(CONCAT(c.nombre, ' ', c.apellido), 'Consumidor Final') AS cliente
            FROM 
                ventas v
            JOIN 
                usuarios u ON v.id_usuario = u.id_usuario
            LEFT JOIN
                clientes c ON v.id_cliente = c.id_cliente
            ORDER BY 
                v.fecha_venta DESC;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener listado de ventas:", error);
        res.status(500).json({ message: 'Error interno del servidor al obtener ventas.' });
    }
};

/**
 * Obtiene el detalle completo de una venta específica (cabecera + líneas).
 */
exports.obtenerDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT 
                v.id_venta, 
                v.fecha_venta, 
                v.total_venta,
                u.nombre AS vendedor_nombre,
                p.nombre AS producto_nombre,
                dv.cantidad,
                dv.precio_unitario
            FROM 
                ventas v
            JOIN 
                detalle_venta dv ON v.id_venta = dv.id_venta
            JOIN
                productos p ON dv.id_producto = p.id_producto
            JOIN
                usuarios u ON v.id_usuario = u.id_usuario
            WHERE 
                v.id_venta = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Venta o detalle no encontrado.' });
        }
        res.json(rows);

    } catch (error) {
        console.error("Error al obtener detalle de venta:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * CREAR VENTA (Función Transaccional Crítica)
 * Asegura que se inserten la cabecera, el detalle y se actualice el stock, o que todo falle.
 */
exports.crearVenta = async (req, res) => {
    const { id_usuario, id_cliente, productos } = req.body; 
    
    // Validaciones mínimas
    if (!id_usuario || !productos || productos.length === 0) {
        return res.status(400).json({ message: 'El ID de usuario y los productos son obligatorios.' });
    }

    let connection; 
    let total_venta = 0;

    try {
        // --- 1. INICIAR TRANSACCIÓN ---
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 2. CÁLCULO DEL TOTAL
        for (const item of productos) {
            // Se calcula el total en el backend para evitar manipulaciones del cliente
            total_venta += item.cantidad * item.precio_unitario;
        }

        // --- 3. INSERTAR CABECERA DE VENTA ---
        const ventaSql = 'INSERT INTO ventas (id_usuario, id_cliente, total_venta) VALUES (?, ?, ?)';
        const [ventaResult] = await connection.query(ventaSql, [id_usuario, id_cliente || null, total_venta]);
        const id_venta = ventaResult.insertId;

        // --- 4. INSERTAR DETALLES Y ACTUALIZAR STOCK ---
        for (const item of productos) {
            // A. Insertar Detalle
            const detalleSql = 'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
            await connection.query(detalleSql, [id_venta, item.id_producto, item.cantidad, item.precio_unitario]);

            // B. Actualizar Stock y validar que haya suficiente
            // 'stock >= ?' en el WHERE garantiza que si el stock es insuficiente, no se ejecute el UPDATE.
            const stockSql = 'UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?';
            const [stockResult] = await connection.query(stockSql, [item.cantidad, item.id_producto, item.cantidad]);

            // Si affectedRows es 0, no se pudo actualizar el stock (era insuficiente)
            if (stockResult.affectedRows === 0) {
                // Forzamos el error para que se active el bloque catch y se haga el ROLLBACK
                throw new Error(`Stock insuficiente para el producto ID: ${item.id_producto}.`);
            }
        }

        // --- 5. CONFIRMAR TRANSACCIÓN ---
        await connection.commit();
        connection.release(); // Liberar la conexión al pool

        res.status(201).json({ 
            message: 'Venta realizada con éxito y stock actualizado', 
            id_venta 
        });

    } catch (error) {
        // --- 6. ROLLBACK SI FALLA ---
        if (connection) {
            await connection.rollback(); // Deshace todos los cambios SQL
            connection.release();
        }
        
        console.error("Error en la transacción de venta:", error.message);
        
        // Retornar un mensaje de error más específico al cliente
        res.status(500).json({ 
            message: 'Error al procesar la venta. La transacción ha sido deshecha.',
            detail: error.message
        });
    }
};