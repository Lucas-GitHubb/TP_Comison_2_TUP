const {connection} = require("../config/DB")

const getAllUsuario = (req,res) =>{

    const consulta = " select * from Usuario;"

    connection.query(consulta, (err, result) => {

    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).send({ message: "Ocurrió un error al consultar los usuarios." });
    }

    res.status(200).json({message: "usuarios obtenidos correctamente.",
      data: result
    });
  });

}

const getOneUsuario = (req, res) => {

  const id = req.params.id;

  const consulta = "select * from Usuario where id_usuario=?;";

  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(404).send({ message: "No existe el usuario" });
    } else {
      res.json(result);
    }
  });
};

const deleteUsuario = (req, res) => {

  const id = req.params.id;

  const consulta = "UPDATE Producto SET estado_del_producto = 0 WHERE id_producto = ?";

  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ message: "Producto eliminado correctamente" });
    }
  });
};


const updateUsuario = (req, res) => {
  console.log("Estoy en updateUsuario");

  const id = req.params.id;
  const { nombre_usuario, apellido_usuario, email_usuario, contraseña_usuario } = req.body;

  

  const consulta = `
    UPDATE Usuario
    SET nombre_usuario = ?, 
        apellido_usuario = ?, 
        email_usuario = ?, 
        contraseña_usuario = ?
    WHERE id_usuario = ?;
  `;

  connection.query(
    consulta,
    [nombre_usuario, apellido_usuario, email_usuario, contraseña_usuario, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar usuario:", err);
        return res.status(500).send({ message: "Ocurrió un error en el servidor." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      res.status(200).send({ message: "Usuario actualizado correctamente." });
    });
};


const createUsuario = (req, res) => {
  console.log("Entre a createUsuario");

  const { nombre_usuario, apellido_usuario, email_usuario, contraseña_usuario } = req.body;

  const consulta = 
    "INSERT INTO Usuario (nombre_usuario, apellido_usuario, email_usuario, contraseña_usuario) VALUES (?, ?, ?, ?);"

  connection.query(
    consulta,
    [nombre_usuario, apellido_usuario, email_usuario, contraseña_usuario],
    (err, result) => {
      if (err) {
        console.error("Error al crear usuario:", err);
        return res.status(500).send({ message: "Ocurrió un error en el servidor." });
      }

      res.status(201).send({ message: "Usuario creado correctamente." });
    }
  );
};






module.exports = {getAllUsuario, getOneUsuario,deleteUsuario , updateUsuario , createUsuario}