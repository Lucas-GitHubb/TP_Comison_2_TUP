const { conection } = require("../config/database");

const crearUsuario = (req, res) => {
  const { nombreUsuario, contraUsuario, email, rol } = req.body;

  const consulta = `INSERT INTO Usuarios 
    (nombreUsuario, contraUsuario, email, rol)
    VALUES (?, ?, ?, ?)`;

  conection.query(
    consulta,
    [nombreUsuario, contraUsuario, email, rol],
    (err, results) => {
      if (err) {
        console.error("Error al crear el usuario:", err);
        return res.status(500).json({ error: "Error al crear el usuario" });
      }
      res.status(201).json({ message: "Usuario creado correctamente" });
    }
  );
};


const borrarUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const consulta = "DELETE FROM Usuarios WHERE idUsuario = ?";

  conection.query(consulta, [idUsuario], (err, results) => {
    if (err) {
      console.error("Error al borrar usuario:", err);
      return res.status(500).json({ error: "Error al borrar usuario" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  });
};

const getUsuarios = (req, res) => {
  const consulta = "SELECT * FROM Usuarios";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.error("Error al obtener los usuarios:", err);
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    
    res.status(200).json(results);
  });
};

const updateUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const { nombreUsuario, contraUsuario, email, rol } = req.body;
  const consulta =
    "UPDATE UsuarioS  SET NOMBREUsuario = ?, CONTRAUsuario = ?, EMAIL = ?, ROL= ? WHERE IDUsuario = ?";

  conection.query(
    consulta,
    [nombreUsuario, contraUsuario, email, rol, idUsuario],
    (err, results) => {
      if (err) {
        console.error("Error al actulizar el Usuario", err);
        return res
          .status(500)
          .json({ error: "Error al querer actualizar un Usuario" });
      }
      return res.status(200).json(results);
    }
  );
};


module.exports = {
    crearUsuario,
    getUsuarios,
    updateUsuario,
    borrarUsuario
}