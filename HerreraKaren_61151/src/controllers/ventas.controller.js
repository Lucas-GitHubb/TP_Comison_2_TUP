import db from "../config/db.js";

// Traer todas las ventas
export const traerVentas = async (req, res) => {
  try {
    const query = `
      SELECT 
        v.idVenta,
        v.idUsuario,
        CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) as vendedor,
        v.fechaVenta,
        v.totalVenta
      FROM ventas v
      LEFT JOIN usuarios u ON v.idUsuario = u.idUsuario
      ORDER BY v.fechaVenta DESC
    `;
    
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error al traer las ventas:", error);
        return res.status(500).json({
          message: "Error al traer las ventas"
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor"
    });
  }
};

// Traer una venta específica con detalles
export const traerVentaPorId = async (req, res) => {
  try {
    const { idVenta } = req.params;
    
    const queryVenta = `
      SELECT 
        v.idVenta,
        v.idUsuario,
        CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) as vendedor,
        v.fechaVenta,
        v.totalVenta
      FROM ventas v
      LEFT JOIN usuarios u ON v.idUsuario = u.idUsuario
      WHERE v.idVenta = ?
    `;
    
    const queryDetalles = `
      SELECT 
        dv.idDetalle,
        dv.idProducto,
        p.nombreProducto,
        dv.cantidad,
        dv.precioUnitario,
        dv.subtotal
      FROM detalle_ventas dv
      LEFT JOIN productos p ON dv.idProducto = p.idProducto
      WHERE dv.idVenta = ?
    `;
    
    db.query(queryVenta, [idVenta], (error, ventaResult) => {
      if (error) {
        console.error("Error al traer la venta:", error);
        return res.status(500).json({
          message: "Error al traer la venta"
        });
      }
      
      if (ventaResult.length === 0) {
        return res.status(404).json({
          message: "Venta no encontrada"
        });
      }
      
      db.query(queryDetalles, [idVenta], (error, detallesResult) => {
        if (error) {
          console.error("Error al traer los detalles:", error);
          return res.status(500).json({
            message: "Error al traer los detalles de la venta"
          });
        }
        
        res.status(200).json({
          venta: ventaResult[0],
          detalles: detallesResult
        });
      });
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor"
    });
  }
};

export const crearUnaVenta = async (req, res) => {
  // Obtener una conexión para la transacción
  const connection = await db.promise().getConnection();
  
  try {
    // 1. Obtener datos del body
    const { idUsuario, productos } = req.body;

    if (!idUsuario || !productos || productos.length === 0) {
      return res.status(400).json({ 
        error: "Faltan datos: idUsuario y productos son requeridos" 
      });
    }

    // 2. Iniciamos la transacción
    await connection.beginTransaction();

    // 3. Calcular el total de la venta usando reduce
    const totalVenta = productos.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precioUnitario);
    }, 0);

    // 4. Crear la venta
    const [resultVenta] = await connection.query(
      'INSERT INTO ventas (idUsuario, totalVenta) VALUES (?, ?)',
      [idUsuario, totalVenta]
    );
    
    const idVenta = resultVenta.insertId;

    // 5. Preparar detalles de la venta usando map
    const detalles = productos.map(producto => [
      idVenta,
      producto.idProducto,
      producto.cantidad,
      producto.precioUnitario
    ]);

    // 6. Insertar los detalles de la venta
    await connection.query(
      `INSERT INTO detalle_ventas 
       (idVenta, idProducto, cantidad, precioUnitario) 
       VALUES ?`,
      [detalles]
    );

    // 7. Validar stock usando map 
    const validacionesStock = productos.map(async (producto) => {
      const [stockResult] = await connection.query(
        'SELECT stockProducto FROM productos WHERE idProducto = ?',
        [producto.idProducto]
      );
      
      if (stockResult.length === 0) {
        throw new Error(`Producto con ID ${producto.idProducto} no encontrado`);
      }
      
      if (stockResult[0].stockProducto < producto.cantidad) {
        throw new Error(`Stock insuficiente para el producto ID ${producto.idProducto}. Stock disponible: ${stockResult[0].stockProducto}`);
      }
      
      return { idProducto: producto.idProducto, stockDisponible: stockResult[0].stockProducto };
    });

    // Ejecutar todas las validaciones en paralelo
    await Promise.all(validacionesStock);

    // 8. Actualizar el stock 
    const actualizacionesStock = productos.map(async (producto) => {
      return await connection.query(
        'UPDATE productos SET stockProducto = stockProducto - ? WHERE idProducto = ?',
        [producto.cantidad, producto.idProducto]
      );
    });

    // Ejecutar todas las actualizaciones en paralelo
    await Promise.all(actualizacionesStock);

    // 9. Confirmar la transacción
    await connection.commit();

    // 10. Responder con éxito
    res.status(201).json({
      message: "Venta creada exitosamente",
      data: {
        idVenta,
        idUsuario,
        totalVenta,
        cantidadProductos: productos.length,
        fechaVenta: new Date()
      }
    });

  } catch (error) {
    // Si algo falla, se revierte todo
    await connection.rollback();
    console.error("Error al crear la venta:", error);
    res.status(500).json({ 
      error: "Error al crear la venta",
      detalle: error.message 
    });
  } finally {
    // Liberar la conexión
    connection.release();
  }
};