import conexion from '../config/db.js';

export const getAllUsuarios = (req, res) => {
  const consulta = "SELECT * FROM usuarios WHERE activo = true";
  
  conexion.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getUsuarioById = (req, res) => {
  const consulta = "SELECT * FROM usuarios WHERE id_usuario = ? AND activo = true";
  const { id } = req.params;
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(results[0]);
  });
};

export const searchUsuarios = (req, res) => {
  const { nombre } = req.params;
  
  const consulta = "SELECT * FROM usuarios WHERE (nombre_usuario LIKE ? OR apellido_usuario LIKE ?) AND activo = true";
  const terminoBusqueda = `%${nombre}%`;

  conexion.query(consulta, [terminoBusqueda, terminoBusqueda], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createUsuario = (req, res) => {
  const { nombre_usuario, apellido_usuario, dni_usuario, telefono, email, tipo_usuario } = req.body;
  
  const consulta = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, dni_usuario, telefono, email, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)";
  
  conexion.query(consulta, [nombre_usuario, apellido_usuario, dni_usuario, telefono, email, tipo_usuario], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, mensaje: "Usuario creado exitosamente" });
  });
};

export const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, apellido_usuario, telefono, email, tipo_usuario } = req.body;
  
  const consulta = "UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, telefono = ?, email = ?, tipo_usuario = ? WHERE id_usuario = ?";
  
  conexion.query(consulta, [nombre_usuario, apellido_usuario, telefono, email, tipo_usuario, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario actualizado exitosamente" });
  });
};

export const deleteUsuario = (req, res) => {
  const { id } = req.params;
  
  const consulta = "UPDATE usuarios SET activo = false WHERE id_usuario = ?";
  
  conexion.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  });
};