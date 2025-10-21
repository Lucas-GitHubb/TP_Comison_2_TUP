import db from "../config/db.js";
import { hashPassword } from "../utils/hashPassword.js";
import enviarEmailDeBievenida from "../utils/servicioDeEmail.js";


export const crearUsuario = async (req, res) => {
  try {
    const { correoUsuario, contraseñaUsuario } = req.body;
    
    // 1- Validar que los campos no estén vacíos
    if (!correoUsuario || !contraseñaUsuario) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }

    // 2- Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
      return res.status(400).json({ error: "Formato de correo inválido" });
    }

    // 3- Validar longitud mínima de contraseña
    if (contraseñaUsuario.length < 4) {
      return res.status(400).json({ 
        error: "La contraseña debe tener al menos 4 caracteres" 
      });
    }

    // 4- Verificar si el usuario ya existe
    const queryMail = 'SELECT idUsuario FROM usuarios WHERE correoUsuario = ?';
    const [usuarioExistente] = await db.query(queryMail, [correoUsuario]);
    
    if (usuarioExistente.length > 0) {
      return res.status(400).json({ 
        error: "Ya existe un usuario con este correo electrónico" 
      });
    }
    
    // 5- hashear la contraseña 
    const hasheadContraseña = await hashPassword(contraseñaUsuario);

    // 6- Insertar el nuevo usuario en la base de datos
    const query =
      'INSERT INTO usuarios (correoUsuario, contraseñaUsuario) VALUES (?, ?)';
    const [result] = await db.query(query, [correoUsuario, hasheadContraseña]);

    // 7- Enviar email de bienvenida
    await enviarEmailDeBievenida(correoUsuario);
    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error en crear Usuario:", error);
    res.status(500).json({ error: "Error en crear usuario" });
  }
};

export const modificarUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { correoUsuario, contraseñaUsuario } = req.body;
    
    //1- Validar que el ID sea válido
    if (!idUsuario || isNaN(idUsuario)) {
      return res.status(400).json({ error: "ID de usuario válido es requerido" });
    }
    
    //2- Validar que los campos no estén vacíos
    if (!correoUsuario || !contraseñaUsuario) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }

    // 3-Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
      return res.status(400).json({ error: "Formato de correo inválido" });
    }

    // 4-Validar longitud mínima de contraseña
    if (contraseñaUsuario.length < 4) {
      return res.status(400).json({ 
        error: "La contraseña debe tener al menos 4 caracteres" 
      });
    }

    // 5- Verificar si el usuario existe
    const queryUsuario = 'SELECT idUsuario FROM usuarios WHERE idUsuario = ?';
    const [usuarioExistente] = await db.query(queryUsuario, [idUsuario]);
    
    if (usuarioExistente.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 6- Verificar si el nuevo correo ya está en uso por otro usuario
    const emailQuery = 'SELECT idUsuario FROM usuarios WHERE correoUsuario = ? AND idUsuario != ?';
    const [emailExistente] = await db.query(emailQuery, [correoUsuario, idUsuario]);
    
    if (emailExistente.length > 0) {
      return res.status(400).json({ 
        error: "Ya existe otro usuario con este correo electrónico" 
      });
    }
    
    //7- Hashear la nueva contraseña antes de actualizarla
    const hasheadContraseña = await hashPassword(contraseñaUsuario);
    
    const query =
      "UPDATE usuarios SET correoUsuario = ?, contraseñaUsuario = ? WHERE idUsuario = ?";
    await db.query(query, [correoUsuario, hasheadContraseña, idUsuario]);
    res.status(200).json({ message: "Usuario modificado exitosamente" });
  } catch (error) {
    console.error("Error en modificar Usuario:", error);
    res.status(500).json({ error: "Error en modificar usuario" });
  }
};

//Obtener todos los Usuarios

export const obtenerUsuarios = async (req, res) => {
  try {
    const query =
      "SELECT idUsuario, correoUsuario, contraseñaUsuario FROM usuarios";
    const [result] = await db.query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en obtener Usuarios:", error);
    res.status(500).json({ error: "Error en obtener usuarios" });
  }
};

// Obtener usuario por id
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const query =
      "SELECT idUsuario, correoUsuario, contraseñaUsuario FROM usuarios WHERE idUsuario = ?";
    const [result] = await db.query(query, [idUsuario]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error en obtener Usuario por ID:", error);
    res.status(500).json({ error: "Error en obtener usuario por ID" });
  }
};
