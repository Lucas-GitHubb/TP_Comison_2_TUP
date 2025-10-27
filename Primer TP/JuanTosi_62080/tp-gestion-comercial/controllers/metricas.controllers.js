import pool from "../config/DB.js";

// Resumen general de ventas (cantidad y monto total)
export const getResumenVentas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(idVenta) AS totalVentas,
        IFNULL(SUM(total), 0) AS montoTotal
      FROM ventas
    `);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener resumen de ventas" });
  }
};

// Productos con bajo stock (por debajo de cierto umbral)
export const getProductosBajoStock = async (req, res) => {
  const limite = parseInt(req.query.limite) || 5; // stock < 5 por defecto
  try {
    const [rows] = await pool.query(
      `
      SELECT idProducto, nombreProducto, stock 
      FROM productos 
      WHERE stock < ? 
      ORDER BY stock ASC
      `,
      [limite]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos con bajo stock" });
  }
};

// Ventas por mes (últimos 6 meses)
export const getVentasPorMes = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        DATE_FORMAT(fechaVenta, '%Y-%m') AS mes,
        COUNT(idVenta) AS cantidadVentas,
        SUM(total) AS totalFacturado
      FROM ventas
      GROUP BY mes
      ORDER BY mes DESC
      LIMIT 6
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas por mes" });
  }
};

// Productos más vendidos (Top 5)
export const getProductosMasVendidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.idProducto,
        p.nombreProducto,
        SUM(dv.cantidad) AS cantidadVendida,
        SUM(dv.subtotal) AS totalGenerado
      FROM detalle_venta dv
      JOIN productos p ON dv.idProducto = p.idProducto
      GROUP BY p.idProducto, p.nombreProducto
      ORDER BY cantidadVendida DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos más vendidos" });
  }
};

// Resumen de proveedores y precios promedio de productos
export const getResumenProveedoresYPrecios = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(DISTINCT idProveedor) AS totalProveedores,
        ROUND(AVG(precio), 2) AS precioPromedio
      FROM productos
    `);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener resumen de proveedores y precios" });
  }
};
