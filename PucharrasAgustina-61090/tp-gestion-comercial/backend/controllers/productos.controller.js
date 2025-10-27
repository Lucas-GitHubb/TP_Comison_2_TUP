import conexion from "../config/db.js";

export const getAllProductos = (req, res) => {
  const consulta = "SELECT * FROM productos WHERE activo = true";
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getProductoById = (req, res) => {
  const consulta = "SELECT * FROM productos WHERE id_producto = ? AND activo = true";
  const { id } = req.params;
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(results[0]);
  });
};

export const searchProductos = (req, res) => {
  const { nombre } = req.params;
  
  if (!nombre) {
    return res.status(400).json({ mensaje: "Término de búsqueda no proporcionado" });
  }

  const consulta = "SELECT * FROM productos WHERE nombre_producto LIKE ? AND activo = true";
  const terminoBusqueda = `%${nombre}%`;

  conexion.query(consulta, [terminoBusqueda], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createProducto = (req, res) => {
  const { nombre_producto, descripcion_producto, precio, stock } = req.body;
  
  const consulta = "INSERT INTO productos (nombre_producto, descripcion_producto, precio, stock) VALUES (?, ?, ?, ?)";
  
  conexion.query(consulta, [nombre_producto, descripcion_producto, precio, stock], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Producto creado exitosamente" });
  });
};

export const updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre_producto, descripcion_producto, precio, stock } = req.body;
  
  const consulta = "UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, precio = ?, stock = ? WHERE id_producto = ?";
  
  conexion.query(consulta, [nombre_producto, descripcion_producto, precio, stock, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado exitosamente" });
  });
};

export const deleteProducto = (req, res) => {
  const { id } = req.params;
  
  const consulta = "UPDATE productos SET activo = false WHERE id_producto = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado exitosamente" });
  });
};