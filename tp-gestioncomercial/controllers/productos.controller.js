const { connection } = require("../config/db");

const getAllProductos = (req, res) => {
  const consulta = `
    SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre 
    FROM productos p 
    LEFT JOIN categorias c ON p.categoria_id = c.id 
    LEFT JOIN proveedores pr ON p.proveedor_id = pr.id 
    WHERE p.activo = true
  `;
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getProductoById = (req, res) => {
  const { id } = req.params;
  const consulta = `
    SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre 
    FROM productos p 
    LEFT JOIN categorias c ON p.categoria_id = c.id 
    LEFT JOIN proveedores pr ON p.proveedor_id = pr.id 
    WHERE p.id = ? AND p.activo = true
  `;
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(results[0]);
  });
};

const createProducto = (req, res) => {
  const { nombre, descripcion, precio_compra, precio_venta, sku, categoria_id, proveedor_id, stock_minimo } = req.body;
  const consulta = "INSERT INTO productos (nombre, descripcion, precio_compra, precio_venta, sku, categoria_id, proveedor_id, stock_minimo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

  connection.query(
    consulta,
    [nombre, descripcion, precio_compra, precio_venta, sku, categoria_id, proveedor_id, stock_minimo],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, mensaje: "Producto creado exitosamente" });
    }
  );
};

const updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio_compra, precio_venta, sku, categoria_id, proveedor_id, stock_minimo } = req.body;
  const consulta = "UPDATE productos SET nombre=?, descripcion=?, precio_compra=?, precio_venta=?, sku=?, categoria_id=?, proveedor_id=?, stock_minimo=? WHERE id=?;";

  connection.query(consulta, [nombre, descripcion, precio_compra, precio_venta, sku, categoria_id, proveedor_id, stock_minimo, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado exitosamente" });
  });
};

const deleteProducto = (req, res) => {
  const { id } = req.params;
  const consulta = "UPDATE productos SET activo = false WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado exitosamente" });
  });
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};