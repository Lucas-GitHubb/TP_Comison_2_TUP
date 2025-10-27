import pool from '../config/DB.js';

export const obtenerVentas = async (req, res) => {
    try {
        const query = `
            SELECT v.id, v.fecha_venta, v.total_venta, u.nombre as nombre_usuario, u.apellido as apellido_usuario
            FROM ventas v
            JOIN usuarios u ON v.id_usuario = u.id
            ORDER BY v.fecha_venta DESC
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerVentaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const ventaQuery = `
            SELECT v.id, v.fecha_venta, v.total_venta, u.nombre as nombre_usuario, u.apellido as apellido_usuario
            FROM ventas v
            JOIN usuarios u ON v.id_usuario = u.id
            WHERE v.id = ?
        `;
        const detallesQuery = `
            SELECT dv.id, dv.cantidad, dv.precio_unitario, p.nombre as nombre_producto
            FROM detalles_venta dv
            JOIN productos p ON dv.id_producto = p.id
            WHERE dv.id_venta = ?
        `;

        const [ventaRows] = await pool.query(ventaQuery, [id]);

        if (ventaRows.length <= 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        const [detallesRows] = await pool.query(detallesQuery, [id]);

        res.json({
            venta: ventaRows[0],
            detalles: detallesRows
        });
    } catch (error) {
        console.error('Error al obtener venta por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearVenta = async (req, res) => {
    const { id_usuario, productos } = req.body; 

    if (!id_usuario || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (id_usuario, productos [array])' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        let totalVentaCalculado = 0;
        const detallesParaInsertar = [];

        for (const item of productos) {
            if (!item.id_producto || !item.cantidad || item.cantidad <= 0) {
                throw new Error('Datos de producto inválidos en el array de productos.');
            }

            const [productoRows] = await connection.query(
                'SELECT precio, stock_disponible FROM productos WHERE id = ? FOR UPDATE', 
                [item.id_producto]
            );

            if (productoRows.length === 0) {
                throw new Error(`Producto con ID ${item.id_producto} no encontrado.`);
            }

            const producto = productoRows[0];

            if (producto.stock_disponible < item.cantidad) {
                throw new Error(`Stock insuficiente para el producto ID ${item.id_producto}. Disponible: ${producto.stock_disponible}`);
            }

            const precioUnitario = producto.precio;
            const subtotalItem = precioUnitario * item.cantidad;
            totalVentaCalculado += subtotalItem;

            detallesParaInsertar.push({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: precioUnitario
            });

            const nuevoStock = producto.stock_disponible - item.cantidad;
            await connection.query(
                'UPDATE productos SET stock_disponible = ? WHERE id = ?',
                [nuevoStock, item.id_producto]
            );
        }

        const fechaVenta = new Date();
        const [ventaResult] = await connection.query(
            'INSERT INTO ventas (id_usuario, fecha_venta, total_venta) VALUES (?, ?, ?)',
            [id_usuario, fechaVenta, totalVentaCalculado]
        );
        const newVentaId = ventaResult.insertId;

        for (const detalle of detallesParaInsertar) {
            await connection.query(
                'INSERT INTO detalles_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [newVentaId, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
            );
        }

        await connection.commit();
        connection.release();

        res.status(201).json({
            message: 'Venta creada exitosamente',
            id_venta: newVentaId,
            total_calculado: totalVentaCalculado
        });

    } catch (error) {
        console.error('Error al crear venta:', error);
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        res.status(500).json({ message: error.message || 'Error interno del servidor al crear la venta' });
    }
};
