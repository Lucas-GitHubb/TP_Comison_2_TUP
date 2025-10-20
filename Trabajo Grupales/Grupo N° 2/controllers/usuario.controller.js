import db from "../config/db.js";

export const CrearUsuario = async (req, res) => {
  try {
    const { correoUsuario, contraseñaUsuario } = req.body;
    const query =
      " insert into usuarios (correoUsuario, contraseñaUsuario) values (?, ?)";
    const [result] = await db.query(query, [correoUsuario, contraseñaUsuario]);
    res
      .status(201)
      .json({
        message: "usuario creado correctamente",
        idcreado: result.insertId,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};