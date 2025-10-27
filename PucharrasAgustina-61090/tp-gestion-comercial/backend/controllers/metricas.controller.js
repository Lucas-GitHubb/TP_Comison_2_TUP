import conexion from "../config/db.js";

export const getAllMetrics = (req, res) => {
  const consulta = "SELECT * FROM metricas ORDER BY fecha_metrica DESC";
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getMetricaByDate = (req, res) => {
  const { fecha } = req.params;
  
  const consulta = "SELECT * FROM metricas WHERE fecha_metrica = ?";
  
  conexion.query(consulta, [fecha], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Métrica no encontrada para esta fecha" });
    res.json(results[0]);
  });
};

export const createMetrica = (req, res) => {
  const { 
    fecha_metrica, 
    total_ventas_dia, 
    cantidad_ventas_dia_, 
    productos_vendidos_dia, 
    total_compras_dia, 
    cantidad_compras_dia, 
    stock_total, 
    nuevos_clientes_dia, 
    ganancia_neta, 
    porcentaje_ganancia 
  } = req.body;
  
  const consulta = "INSERT INTO metricas (fecha_metrica, total_ventas_dia, cantidad_ventas_dia_, productos_vendidos_dia, total_compras_dia, cantidad_compras_dia, stock_total, nuevos_clientes_dia, ganancia_neta, porcentaje_ganancia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  conexion.query(consulta, [fecha_metrica, total_ventas_dia, cantidad_ventas_dia_, productos_vendidos_dia, total_compras_dia, cantidad_compras_dia, stock_total, nuevos_clientes_dia, ganancia_neta, porcentaje_ganancia], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Métrica creada exitosamente" });
  });
};

export const updateMetrica = (req, res) => {
  const { id } = req.params;
  const { 
    total_ventas_dia, 
    cantidad_ventas_dia_, 
    productos_vendidos_dia, 
    total_compras_dia, 
    cantidad_compras_dia, 
    stock_total, 
    nuevos_clientes_dia, 
    ganancia_neta, 
    porcentaje_ganancia 
  } = req.body;
  
  const consulta = "UPDATE metricas SET total_ventas_dia = ?, cantidad_ventas_dia_ = ?, productos_vendidos_dia = ?, total_compras_dia = ?, cantidad_compras_dia = ?, stock_total = ?, nuevos_clientes_dia = ?, ganancia_neta = ?, porcentaje_ganancia = ? WHERE id_metrica = ?";
  
  conexion.query(consulta, [total_ventas_dia, cantidad_ventas_dia_, productos_vendidos_dia, total_compras_dia, cantidad_compras_dia, stock_total, nuevos_clientes_dia, ganancia_neta, porcentaje_ganancia, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Métrica no encontrada" });
    res.json({ mensaje: "Métrica actualizada exitosamente" });
  });
};

export const deleteMetrica = (req, res) => {
  const { id } = req.params;
  
  const consulta = "DELETE FROM metricas WHERE id_metrica = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Métrica no encontrada" });
    res.json({ mensaje: "Métrica eliminada exitosamente" });
  });
};