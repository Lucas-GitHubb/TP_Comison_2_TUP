import db from "../config/db.js";
import bcrypt from "bcryptjs";

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

    // 4. Si todo es correcto, devolver éxito
    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error en el proceso de login" });
  }
};
