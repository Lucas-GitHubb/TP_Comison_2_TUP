import conexion from '../config/db.js';

export const getAllVentas = (req, res) => {
  const consulta = `
    SELECT v.*, u.nombre_usuario, u.apellido_usuario, p.nombre_producto 
    FROM ventas v 
    JOIN usuarios u ON v.id_usuario = u.id_usuario 
    JOIN productos p ON v.id_producto = p.id_producto
  `;
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getVentaById = (req, res) => {
  const { id } = req.params;
  
  const consulta = `
    SELECT v.*, u.nombre_usuario, u.apellido_usuario, p.nombre_producto 
    FROM ventas v 
    JOIN usuarios u ON v.id_usuario = u.id_usuario 
    JOIN productos p ON v.id_producto = p.id_producto 
    WHERE v.id_venta = ?
  `;
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Venta no encontrada" });
    res.json(results[0]);
  });
};

export const createVenta = (req, res) => {
  const { id_usuario, id_producto, cantidad_total, precio_unitario, total_venta, estado_venta } = req.body;
  
  const consulta = "INSERT INTO ventas (id_usuario, id_producto, cantidad_total, precio_unitario, total_venta, estado_venta) VALUES (?, ?, ?, ?, ?, ?)";
  
  conexion.query(consulta, [id_usuario, id_producto, cantidad_total, precio_unitario, total_venta, estado_venta], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Venta creada exitosamente" });
  });
};


export const updateVenta = (req, res) => {
  const { id } = req.params;
  const { estado_venta, cantidad_total, total_venta } = req.body;
  
  const consulta = "UPDATE ventas SET estado_venta = ?, cantidad_total = ?, total_venta = ? WHERE id_venta = ?";
  
  conexion.query(consulta, [estado_venta, cantidad_total, total_venta, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Venta no encontrada" });
    res.json({ mensaje: "Venta actualizada exitosamente" });
  });
};


export const deleteVenta = (req, res) => {
  const { id } = req.params;
  
  const consulta = "DELETE FROM ventas WHERE id_venta = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Venta no encontrada" });
    res.json({ mensaje: "Venta eliminada exitosamente" });
  });
};