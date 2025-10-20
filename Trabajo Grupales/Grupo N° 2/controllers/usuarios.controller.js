import db from "../config/db.js";
import bcrypt from "bcryptjs";
import enviarEmailDeBievenida from "../utils/servicioDeEmail.js";


export const crearUsuario = async (req, res) => {
  try {
    const { correoUsuario, contraseñaUsuario } = req.body;
    console.log(contraseñaUsuario, correoUsuario);
    // hashear la contraseña
    const saltRounds = 10;
    const hasheadContraseña = await bcrypt.hash(contraseñaUsuario, saltRounds);

    const query =
      'INSERT INTO usuarios (correoUsuario, contraseñaUsuario) VALUES (?, ?)';
    const [result] = await db.query(query, [correoUsuario, hasheadContraseña]);

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
    if (!idUsuario) {
      return res.status(400).json({ error: "ID de usuario es requerido" });
    }
    if (!correoUsuario || !contraseñaUsuario) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }
    const query =
      "UPDATE usuarios SET correoUsuario = ?, contraseñaUsuario = ? WHERE idUsuario = ?";
    await db.query(query, [correoUsuario, contraseñaUsuario, idUsuario]);
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
