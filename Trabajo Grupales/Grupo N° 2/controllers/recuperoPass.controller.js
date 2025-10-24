import db from "../db/db.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";


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

    // 2. Verificar si el usuario existe en la base de datos
    const usuario = await db.query("SELECT * FROM usuarios WHERE correoUsuario = ?", [correoUsuario]);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado" });
    }

    // 3. Generar un token JWT para el usuario
    const token = jsonwebtoken.sign({ id: usuario.idUsuario }, process.env.SECRET_JWT, { expiresIn: "1h" });

    // 4. Enviar el correo electrónico con el enlace de recuperación
    const link = `http://localhost:${process.env.PORT}/recuperar-password/${token}`;
    await recuperarContraseña(correoUsuario, link);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    console.error(`Error en iniciarRecuperoContraseña: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
