import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { correoUsuario, contraseñaUsuario } = req.body;

    // 1. Validar que se recibieron ambos campos
    if (!correoUsuario || !contraseñaUsuario) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }
    // 2. Buscar el usuario en la base de datos
    const query = "SELECT * FROM usuarios WHERE correoUsuario = ?";
    const [results] = await db.query(query, [correoUsuario]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];

    // 3. Comparar la contraseña proporcionada con la almacenada
    const compararContraseña = bcrypt.compareSync(
      contraseñaUsuario,
      user.contraseñaUsuario
    );

    if (!compararContraseña) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 4. Si todo es correcto, devolvemos el mensaje ed exito junto con el token JWT

    const token = jsonwebtoken.sign(
      { idUsuario: user.idUsuario, correoUsuario: user.correoUsuario },
      process.env.SECRET_JWT,
      { expiresIn: "1h" }
    );

    // user.token = token;
    // delete user.contraseñaUsuario; // Eliminar la contraseña del objeto user antes de enviarlo
    const payload = {
      idUsuario: user.idUsuario,
      correoUsuario: user.correoUsuario,
      token: token,
    };

    res.status(200).json({ message: "Login exitoso", user: payload });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error en el proceso de login" });
  }
};
