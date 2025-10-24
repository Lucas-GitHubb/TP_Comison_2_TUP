import db from "../config/db.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import { recuperarContraseña } from "../config/nodemailer.js";
import { hashPassword } from "../utils/hashPassword.js";


dotenv.config();

// Controlador para iniciar el proceso de recuperación de contraseña

export const iniciarRecuperoContraseña = async (req, res) => {
  try {
    const { correoUsuario } = req.body;
    
    // 1. Validar que se recibió el campo correoUsuario
    if (!correoUsuario) {
      return res
        .status(400)
        .json({ error: "El correo electrónico es requerido" });
    }

    // 2. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
      return res.status(400).json({ error: "Formato de correo inválido" });
    }

    // 3. Verificar si el usuario existe en la base de datos
    const [usuarios] = await db.query("SELECT * FROM usuarios WHERE correoUsuario = ?", [correoUsuario]);
    
    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado" });
    }

    const usuario = usuarios[0];

    // 4. Generar un token JWT para recuperación de contraseña
    const token = jsonwebtoken.sign(
      { 
        idUsuario: usuario.idUsuario, 
        correoUsuario: usuario.correoUsuario,
        purpose: "password-reset" 
      }, 
      process.env.SECRET_JWT, 
      { expiresIn: "1h" }
    );

    // 5. Enviar el correo electrónico con el enlace de recuperación
    const link = `http://localhost:3000/api/pass/recuperar?token=${token}`;
    await recuperarContraseña(correoUsuario, link);

    return res.status(200).json({ 
      message: "Correo de recuperación enviado exitosamente" 
    });
  } catch (error) {
    console.error(`Error al recuperar contraseña: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Controlador para resetear la contraseña
export const resetPass = async (req, res) => {
  try {
    const { token } = req.query;
    const { contraseñaUsuario } = req.body;

    // 1. Validar que se recibió el token
    if (!token) {
      return res.status(400).json({ error: "Token de recuperación requerido" });
    }

    // 2. Validar que se recibió la nueva contraseña
    if (!contraseñaUsuario) {
      return res.status(400).json({ error: "Nueva contraseña requerida" });
    }

    // 3. Validar longitud mínima de contraseña
    if (contraseñaUsuario.length < 4) {
      return res.status(400).json({ 
        error: "La contraseña debe tener al menos 4 caracteres" 
      });
    }

    // 4. Verificar y decodificar el token JWT
    let decodedToken;
    try {
      decodedToken = jsonwebtoken.verify(token, process.env.SECRET_JWT);
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // 5. Verificar que el token es para recuperación de contraseña
    if (decodedToken.purpose !== "password-reset") {
      return res.status(401).json({ error: "Token no válido para esta operación" });
    }

    // 6. Verificar que el usuario aún existe
    const [usuarios] = await db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [decodedToken.idUsuario]);
    
    if (usuarios.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 7. Hashear la nueva contraseña
    const hashedNuevaContraseña = await hashPassword(contraseñaUsuario);

    // 8. Actualizar la contraseña en la base de datos
    await db.query(
      "UPDATE usuarios SET contraseñaUsuario = ? WHERE idUsuario = ?",
      [hashedNuevaContraseña, decodedToken.idUsuario]
    );

    return res.status(200).json({ 
      message: "Contraseña actualizada exitosamente" 
    });

  } catch (error) {
    console.error(`Error en resetPass: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};