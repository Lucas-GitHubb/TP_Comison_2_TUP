// const {connection} = require('../config/config');
const prisma = require('../config/prisma');
const {hashPassword} = require('../utils/hash.utils');



// const mostrarTodosUsuarios = (req, res) => {

//     const queryUsuario = "select * from Usuarios where activo = 1";

//     connection.query(queryUsuario, (error, results)=>{
//         if(error){
//             console.error("Error al obtener los usuarios: ", error);
//             res.status(500).json({message: "Error al obtener los usuarios"});
//         }

//         res.status(200).json(results);
//     });

// }

// const mostrarUsuariosInactivos = (req,res)=>{

//     const queryUsuarioInactivo = "select * from Usuarios where activo = 0";

//     connection.query(queryUsuarioInactivo, (error,results)=>
//     {
//         if(error){
//             console.error("Error al obtener los usuarios inactivos: ", error);
//             res.status(500).json({message: "Error al obtener los usuarios inactivos"});
//         }

//         if(results.length === 0){
//             return res.status(404).json({message: "No hay usuarios inactivos"});
//         }

//         res.status(200).json(results);  
//     })
// }

// const mostrarUsuarioPorId = (req, res) => {
//     const id = req.params.id;
//     const queryUsuarioId = "select * from Usuarios where id = ?";

//     connection.query(queryUsuarioId, [id], (error, results) => {
//         if (error) {
//             console.error("Error al obtener el usuario: ", error);
//             res.status(500).json({ message: "Error al obtener el usuario" });
//         }
//         res.status(200).json(results);
//     });
// }
// const crearUsuario = (req, res) => {
//     const { nombre, password, rol} = req.body;

//     const hashedPassword =  hashPassword(password);

//     const queryCrearUsuario = "INSERT INTO Usuarios (username,pass,rol) VALUES (?, ?, ?)";

//     connection.query(queryCrearUsuario,[nombre, hashedPassword, rol], (error, results) => {
//         if (error) {
//             console.error("Error al crear el usuario: ", error);
//             res.status(500).json({ message: "Error al crear el usuario" });
//         }
//         res.status(201).json({ message: "Usuario creado exitosamente" });
//     });
// }

// const actualizarUsuario = async (req, res) => {
//     const id = req.params.id;
//     const { nombre, password, rol, activo } = req.body;

//     const hashedPassword = await hashPassword(password);

//     const queryActualizarUsuario = "UPDATE Usuarios SET username = ?, pass = ?, Rol = ?, activo = ? WHERE id_usuario = ?";
//     connection.query(queryActualizarUsuario, [nombre, hashedPassword, rol, activo, id], (error, results) => {
//         if (error) {
//             console.error("Error al actualizar el usuario: ", error);
//             res.status(500).json({ message: "Error al actualizar el usuario" });
//         }
//         res.status(200).json({ message: "Usuario actualizado exitosamente" });
//     });
// }

// //eliminacion fisica
// const eliminarUsuario = (req, res) => {
//     const id = req.params.id;
//     const queryEliminarUsuario = "DELETE FROM Usuarios WHERE id = ?";
//     connection.query(queryEliminarUsuario, [id], (error, results) => {
//         if (error) {
//             console.error("Error al eliminar el usuario: ", error);
//             res.status(500).json({ message: "Error al eliminar el usuario" });
//         }
//         res.status(200).json({ message: "Usuario eliminado exitosamente" });
//     });
// }

// //eliminacion logica
// const eliminadoLogicoUsuario = (req, res) => {
//     const id = req.params.id;
//     const queryActivarUsuario = "UPDATE Usuarios SET activo = ? WHERE id = ?";
//     connection.query(queryActivarUsuario, [0, id], (error, results) => {
//         if (error) {
//             console.error("Error al activar el usuario: ", error);
//             res.status(500).json({ message: "Error al activar el usuario" });
//         }
//         res.status(200).json({ message: "Usuario activado exitosamente" });
//     });
// }

// // Activar usuarios inactivos
//  const activarUsuario = (req, res) => { 

//     const id= req.params.id;
//     const queryActivarUsuario = "UPDATE Usuarios SET activo = ? WHERE id = ?";

//     connection.query(queryActivarUsuario, [1, id], (error, results) => {
//         if (error) {
//             console.error("Error al activar el usuario: ", error);
//             res.status(500).json({ message: "Error al activar el usuario" });
//         }

//         if(results.affectedRows === 0){
//             return res.status(404).json({message: "Usuario no encontrado"});
//         }
//         res.status(200).json({ message: "Usuario activado exitosamente" });
//     });
//  }

const mostrarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.Usuarios.findMany({
      where: { activo: 1 }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

const mostrarUsuariosInactivos = async (req, res) => {
  try {
    const usuarios = await prisma.Usuarios.findMany({
      where: { activo: 0 }
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ message: "No hay usuarios inactivos" });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios inactivos" });
  }
};

const mostrarUsuarioPorId = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const usuario = await prisma.Usuarios.findUnique({
      where: { id_usuario: id }
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

const crearUsuario = async (req, res) => {
  const { nombre, password, rol } = req.body;
  const hashedPassword = hashPassword(password);

  try {
    await prisma.Usuarios.create({
      data: {
        username: nombre,
        pass: hashedPassword,
        rol,
        activo: 1
      }
    });
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, password, rol, activo } = req.body;
  const hashedPassword = hashPassword(password);

  try {
    await prisma.Usuarios.update({
      where: { id_usuario: id },
      data: {
        username: nombre,
        pass: hashedPassword,
        rol,
        activo
      }
    });
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

const eliminadoLogicoUsuario = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.Usuarios.update({
      where: { id_usuario: id },
      data: { activo: 0 }
    });
    res.status(200).json({ message: "Usuario desactivado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar el usuario" });
  }
};

const activarUsuario = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const upd = await prisma.Usuarios.update({
      where: { id_usuario: id },
      data: { activo: 1 }
    });
    res.status(200).json({ message: "Usuario activado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al activar el usuario" });
  }
};


module.exports = {mostrarTodosUsuarios,mostrarUsuariosInactivos, mostrarUsuarioPorId,crearUsuario,actualizarUsuario,eliminarUsuario,eliminadoLogicoUsuario,activarUsuario}