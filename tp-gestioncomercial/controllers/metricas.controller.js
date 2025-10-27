const { connection } = require("../config/db");

const getVentasTotales = (req, res) => {
  const consulta = `
    SELECT 
      COUNT(*) as total_ventas,
      SUM(total) as ingresos_totales,
      AVG(total) as promedio_venta
    FROM ventas 
    WHERE estado = 'completada'
  `;
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

const getProductosMasVendidos = (req, res) => {
  const consulta = `
    SELECT 
      p.nombre,
      SUM(dv.cantidad) as total_vendido,
      SUM(dv.subtotal) as ingresos_totales
    FROM detalle_ventas dv
    LEFT JOIN productos p ON dv.producto_id = p.id
    GROUP BY p.id, p.nombre
    ORDER BY total_vendido DESC
    LIMIT 10
  `;
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getVentasTotales,
  getProductosMasVendidos
};