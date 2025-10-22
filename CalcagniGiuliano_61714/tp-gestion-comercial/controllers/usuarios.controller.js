const conection = require("../config/db");

//Traer todos los usuarios
const getAllUsuarios = (req, res) => {
  const consulta = "SELECT * FROM usuarios WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }

    return res.json(results);
  });
};

//Traer un usuario
const getOneUsuario = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM usuarios WHERE id_usuario = ?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(results[0]);
  });
};

//Borrar cliente
const deleteUsuario = (req, res) => {
  const { id } = req.params;

  const consulta =
    "UPDATE usuarios SET estado = false WHERE id_usuario = ?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({message: "Usuario eliminado correctamente "})
  });
};

//Actualizar usuario
const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, contraseña, email, rol } = req.body;

  const consulta =
    "UPDATE usuarios SET nombre=?, contraseña=?, email=?, rol=? WHERE id_usuario=?";

  conection.query(
    consulta,
    [nombre, contraseña, email, rol, id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el usuario" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "No se encontro el usuario para actualizar" });
      }

      return res
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    }
  );
};

//Crear usuario
const createUsuario = (req, res) => {
  const { nombre, contraseña, email, rol } = req.body;

  const consulta =
    "INSERT INTO usuarios (nombre,contraseña,email,rol) VALUES (?,?,?,?)";

  conection.query(
    consulta,
    [nombre, contraseña, email, rol],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error al crear el Usuario" });
      }

      return res.status(201).json({ message: "Usuario creado correctamente" });
    }
  );
};

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  deleteUsuario,
  updateUsuario,
  createUsuario
};
