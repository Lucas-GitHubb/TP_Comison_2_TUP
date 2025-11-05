const { pool } = require('../config/DB.js');

exports.ventasPorDia = async (req, res) => {
  const { fecha } = req.query;
  const [rows] = await pool.query(
    `SELECT DATE(fecha) as dia, COUNT(*) as ventas, SUM(total) as total
     FROM ventas WHERE DATE(fecha)=? GROUP BY DATE(fecha)`,
    [fecha]
  );
  res.json(rows[0] || { dia: fecha, ventas: 0, total: 0 });
};

exports.ventasPorMes = async (req, res) => {
  const { anio, mes } = req.query;
  const [rows] = await pool.query(
    `SELECT COUNT(*) as ventas, SUM(total) as total
     FROM ventas WHERE YEAR(fecha)=? AND MONTH(fecha)=?`,
    [anio, mes]
  );
  res.json(rows[0]);
};

exports.topProductos = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.nombre, SUM(d.cantidad) as cantidad
     FROM venta_detalle d
     JOIN productos p ON p.id = d.id_producto
     GROUP BY p.id ORDER BY cantidad DESC LIMIT 5`
  );
  res.json(rows);
};

exports.stockBajo = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE stock_actual < stock_minimo');
  res.json(rows);
};

exports.valorStock = async (_req, res) => {
  const [[row]] = await pool.query(
    `SELECT SUM(stock_actual * precio_venta) as valor_venta, SUM(stock_actual * precio_compra) as valor_costo FROM productos`
  );
  res.json(row);
};
