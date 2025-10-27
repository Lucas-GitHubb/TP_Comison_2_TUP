const { connection } = require("../config/db");

// Obtener todos los proveedores
const getAllProveedores = (req, res) => {
  const consulta = "SELECT * FROM proveedores WHERE activo = true;";
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener proveedor por ID
const getProveedorById = (req, res) => {
  const { id } = req.params;
  const consulta = "SELECT * FROM proveedores WHERE id = ? AND activo = true;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json(results[0]);
  });
};

// Crear proveedor
const createProveedor = (req, res) => {
  const { nombre, contacto, email, telefono, direccion, ruc } = req.body;
  const consulta = "INSERT INTO proveedores (nombre, contacto, email, telefono, direccion, ruc) VALUES (?, ?, ?, ?, ?, ?);";

  connection.query(
    consulta,
    [nombre, contacto, email, telefono, direccion, ruc],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, mensaje: "Proveedor creado exitosamente" });
    }
  );
};

// Actualizar proveedor
const updateProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, email, telefono, direccion, ruc } = req.body;
  const consulta = "UPDATE proveedores SET nombre=?, contacto=?, email=?, telefono=?, direccion=?, ruc=? WHERE id=?;";

  connection.query(consulta, [nombre, contacto, email, telefono, direccion, ruc, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json({ mensaje: "Proveedor actualizado exitosamente" });
  });
};

// Eliminar proveedor (desactivar) - CORREGIDO: usar false
const deleteProveedor = (req, res) => {
  const { id } = req.params;
  const consulta = "UPDATE proveedores SET activo = false WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json({ mensaje: "Proveedor eliminado exitosamente" });
  });
};

// Obtener productos por proveedor
const getProductosByProveedor = (req, res) => {
  const { proveedorId } = req.params;
  const consulta = "SELECT * FROM productos WHERE proveedor_id = ? AND activo = true;";
  
  connection.query(consulta, [proveedorId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getAllProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProductosByProveedor
};