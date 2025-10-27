import conexion from '../config/db.js';

export const getAllProveedores = (req, res) => {
  const consulta = `
    SELECT p.*, u.nombre_usuario, u.apellido_usuario, u.email 
    FROM proveedores p 
    JOIN usuarios u ON p.id_usuario = u.id_usuario
  `;
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getProveedorById = (req, res) => {
  const { id } = req.params;
  
  const consulta = `
    SELECT p.*, u.nombre_usuario, u.apellido_usuario, u.email 
    FROM proveedores p 
    JOIN usuarios u ON p.id_usuario = u.id_usuario 
    WHERE p.id_proveedor = ?
  `;
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json(results[0]);
  });
};

export const createProveedor = (req, res) => {
  const { id_usuario, nombre_empresa, contacto_empresa, telefono_empresa, email_empresa, direccion_empresa } = req.body;
  
  const consulta = "INSERT INTO proveedores (id_usuario, nombre_empresa, contacto_empresa, telefono_empresa, email_empresa, direccion_empresa) VALUES (?, ?, ?, ?, ?, ?)";
  
  conexion.query(consulta, [id_usuario, nombre_empresa, contacto_empresa, telefono_empresa, email_empresa, direccion_empresa], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Proveedor creado exitosamente" });
  });
};

export const updateProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre_empresa, contacto_empresa, telefono_empresa, email_empresa, direccion_empresa } = req.body;
  
  const consulta = "UPDATE proveedores SET nombre_empresa = ?, contacto_empresa = ?, telefono_empresa = ?, email_empresa = ?, direccion_empresa = ? WHERE id_proveedor = ?";
  
  conexion.query(consulta, [nombre_empresa, contacto_empresa, telefono_empresa, email_empresa, direccion_empresa, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json({ mensaje: "Proveedor actualizado exitosamente" });
  });
};

export const deleteProveedor = (req, res) => {
  const { id } = req.params;
  
  const consulta = "DELETE FROM proveedores WHERE id_proveedor = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json({ mensaje: "Proveedor eliminado exitosamente" });
  });
};