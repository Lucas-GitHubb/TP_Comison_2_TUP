import conexion from "../config/db.js";

export const getAllCompras = (req, res) => {
  const consulta = `
    SELECT c.*, p.nombre_empresa, prod.nombre_producto 
    FROM compras_proveedor c 
    JOIN proveedores p ON c.id_proveedor = p.id_proveedor 
    JOIN productos prod ON c.id_producto = prod.id_producto
  `;
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getCompraById = (req, res) => {
  const { id } = req.params;
  
  const consulta = `
    SELECT c.*, p.nombre_empresa, prod.nombre_producto 
    FROM compras_proveedor c 
    JOIN proveedores p ON c.id_proveedor = p.id_proveedor 
    JOIN productos prod ON c.id_producto = prod.id_producto 
    WHERE c.id_compra = ?
  `;
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json(results[0]);
  });
};

export const searchComprasByProveedor = (req, res) => {
  const { proveedor } = req.params;
  
  const consulta = `
    SELECT c.*, p.nombre_empresa, prod.nombre_producto 
    FROM compras_proveedor c 
    JOIN proveedores p ON c.id_proveedor = p.id_proveedor 
    JOIN productos prod ON c.id_producto = prod.id_producto 
    WHERE p.nombre_empresa LIKE ?
  `;
  const terminoBusqueda = `%${proveedor}%`;

  conexion.query(consulta, [terminoBusqueda], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createCompra = (req, res) => {
  const { id_proveedor, id_producto, cantidad, precio_unitario, total_compra, estado_compra } = req.body;
  
  const consulta = "INSERT INTO compras_proveedor (id_proveedor, id_producto, cantidad, precio_unitario, total_compra, estado_compra) VALUES (?, ?, ?, ?, ?, ?)";
  
  conexion.query(consulta, [id_proveedor, id_producto, cantidad, precio_unitario, total_compra, estado_compra], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Compra creada exitosamente" });
  });
};

export const updateCompra = (req, res) => {
  const { id } = req.params;
  const { estado_compra, cantidad, precio_unitario, total_compra } = req.body;
  
  const consulta = "UPDATE compras_proveedor SET estado_compra = ?, cantidad = ?, precio_unitario = ?, total_compra = ? WHERE id_compra = ?";
  
  conexion.query(consulta, [estado_compra, cantidad, precio_unitario, total_compra, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json({ mensaje: "Compra actualizada exitosamente" });
  });
};

export const deleteCompra = (req, res) => {
  const { id } = req.params;
  
  const consulta = "DELETE FROM compras_proveedor WHERE id_compra = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json({ mensaje: "Compra eliminada exitosamente" });
  });
};