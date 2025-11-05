// controllers/usuariosController.js
exports.getUsuarios = (req, res) => {
  res.json({ message: "Listado de usuarios" });
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Detalles del usuario con ID ${id}` });
};

exports.createUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  res.json({ message: "Usuario creado correctamente", data: nuevoUsuario });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Usuario ${id} actualizado` });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Usuario ${id} eliminado` });
};
