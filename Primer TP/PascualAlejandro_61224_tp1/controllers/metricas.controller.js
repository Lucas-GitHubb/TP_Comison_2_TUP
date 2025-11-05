import { pool } from "../config/db.js";

// /api/metricas/ventas/diarias?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function ventasDiarias(req, res, next) {
  try {
    const { from, to } = req.query;
    const [rows] = await pool.query(
      `SELECT DATE(fecha) AS dia, COUNT(*) AS cantidad, SUM(total) AS total
       FROM ventas
       WHERE (:from IS NULL OR DATE(fecha) >= :from)
         AND (:to IS NULL OR DATE(fecha) <= :to)
       GROUP BY DATE(fecha)
       ORDER BY dia`,
      { from: from || null, to: to || null }
    );
    res.json(rows);
  } catch (e) { next(e); }
}

// /api/metricas/resumen
export async function resumenVentas(_req, res, next) {
  try {
    const [[agg]] = await pool.query(
      `SELECT COUNT(*) AS ventas, COALESCE(SUM(total),0) AS facturacion
       FROM ventas`
    );
    res.json(agg);
  } catch (e) { next(e); }
}

// /api/metricas/top-productos?limit=5
export async function topProductos(req, res, next) {
  try {
    const limit = Number(req.query.limit || 5);
    const [rows] = await pool.query(
      `SELECT p.id, p.nombre, SUM(d.cantidad) AS unidades, SUM(d.subtotal) AS ingreso
       FROM venta_detalles d
       JOIN productos p ON p.id = d.producto_id
       GROUP BY p.id, p.nombre
       ORDER BY unidades DESC
       LIMIT :limit`,
      { limit }
    );
    res.json(rows);
  } catch (e) { next(e); }
}

// /api/metricas/stock/valor
export async function valorStock(_req, res, next) {
  try {
    const [[row]] = await pool.query(
      `SELECT
         COALESCE(SUM(stock * costo),0)  AS valor_costo,
         COALESCE(SUM(stock * precio),0) AS valor_venta
       FROM productos`
    );
    res.json(row);
  } catch (e) { next(e); }
}
