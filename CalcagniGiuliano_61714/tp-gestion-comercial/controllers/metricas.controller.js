import { pool } from "../config/DB.js";

export const totalVentas = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as cantidad, IFNULL(SUM(vd.cantidad * vd.precio_unitario),0) as total
     FROM ventas v JOIN venta_detalle vd ON v.id = vd.id_venta`
  );
  res.json(rows[0]);
};

export const productosMasVendidos = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT p.nombre, SUM(vd.cantidad) as total_vendido
     FROM venta_detalle vd JOIN productos p ON vd.id_producto = p.id
     GROUP BY vd.id_producto ORDER BY total_vendido DESC LIMIT 5`
  );
  res.json(rows);
};

export const stockBajo = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT nombre, stock_minimo FROM productos WHERE stock_minimo > 0 ORDER BY stock_minimo DESC LIMIT 5`
  );
  res.json(rows);
};
