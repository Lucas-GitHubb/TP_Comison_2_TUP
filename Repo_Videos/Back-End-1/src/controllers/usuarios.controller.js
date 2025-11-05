// const {connection} = require('../config/config');
const prisma = require('../config/prisma');
const {hashPassword} = require('../utils/hash.utils');


const mostrarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                activo: 1
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        res.status(500).json({message: "Error al obtener los usuarios"});
    }}
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

const mostrarUsuariosInactivos = async(req,res)=>{
    try {
        const usuariosInactivos = await prisma.usuarios.findMany({
            where: {
                activo: 0
            }
        });
        if(usuariosInactivos.length === 0){
            return res.status(404).json({message: "No hay usuarios inactivos"});
        }

        res.status(200).json(usuariosInactivos);
    } catch (error) {
        console.error("Error al obtener los usuarios inactivos: ", error);
        res.status(500).json({message: "Error al obtener los usuarios inactivos"});
    }
}

const mostrarUsuarioPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario: ", error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
}
//         if (error) {
//             console.error("Error al obtener el usuario: ", error);
//             res.status(500).json({ message: "Error al obtener el usuario" });
//         }
//         res.status(200).json(results);
//     });
// }

const crearUsuario = async (req, res) => {
    const { nombre, password, rol} = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const nuevoUsuario = await prisma.usuarios.create({
            data: {
                username: nombre,
                pass: hashedPassword,
                rol: rol
            }
        });
        res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
}

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


const actualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { nombre, password, rol, activo } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const usuarioActualizado = await prisma.usuarios.update({
            where: {
                id: Number(id)
            },
            data: {
                username: nombre,
                pass: hashedPassword,
                rol: rol,
                activo: activo
            }
        });
        res.status(200).json({ message: "Usuario actualizado exitosamente", usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al actualizar el usuario: ", error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
}
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


const eliminarUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.usuarios.delete({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}
//eliminacion fisica
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

const eliminadoLogicoUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuarioDesactivado = await prisma.usuarios.update({
            where: {
                id: Number(id)
            },
            data: {
                activo: 0
            }
        });
        res.status(200).json({ message: "Usuario desactivado exitosamente", usuario: usuarioDesactivado });
    }
    catch (error) {
        console.error("Error al desactivar el usuario: ", error);
        res.status(500).json({ message: "Error al desactivar el usuario" });
    }
}
//eliminacion logica
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

const activarUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuarioActivado = await prisma.usuarios.update({
            where: {
                id: Number(id)
            },
            data: {
                activo: 1
            }
        });
        res.status(200).json({ message: "Usuario activado exitosamente", usuario: usuarioActivado });
    }
    catch (error) {
        console.error("Error al activar el usuario: ", error);
        res.status(500).json({ message: "Error al activar el usuario" });
    }
}
// Activar usuarios inactivos
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



module.exports = {mostrarTodosUsuarios,mostrarUsuariosInactivos, mostrarUsuarioPorId,crearUsuario,actualizarUsuario,eliminarUsuario,eliminadoLogicoUsuario,activarUsuario}