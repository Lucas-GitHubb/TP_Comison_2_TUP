const { connection } = require("../config/db");

// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
  const consulta = "SELECT * FROM usuarios WHERE activo = true;";
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener usuario por ID
const getUsuarioById = (req, res) => {
  const { id } = req.params;
  const consulta = "SELECT * FROM usuarios WHERE id = ? AND activo = true;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(results[0]);
  });
};

// Crear usuario
const createUsuario = (req, res) => {
  const { nombre, email, telefono, direccion, rol } = req.body;
  const consulta = "INSERT INTO usuarios (nombre, email, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?);";

  connection.query(
    consulta,
    [nombre, email, telefono, direccion, rol],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, mensaje: "Usuario creado exitosamente" });
    }
  );
};

// Actualizar usuario
const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, rol } = req.body;
  const consulta = "UPDATE usuarios SET nombre=?, email=?, telefono=?, direccion=?, rol=? WHERE id=?;";

  connection.query(consulta, [nombre, email, telefono, direccion, rol, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario actualizado exitosamente" });
  });
};

// Eliminar usuario (desactivar) - CORREGIDO: usar false en lugar de 0
const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const consulta = "UPDATE usuarios SET activo = false WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  });
};

// Activar usuario - CORREGIDO: usar true en lugar de 1
const activateUsuario = (req, res) => {
  const { id } = req.params;
  const consulta = "UPDATE usuarios SET activo = true WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario activado exitosamente" });
  });
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  activateUsuario
};