const conection = require("../config/database"); // este debe exportar .promise()
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET


const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await conection.query(
      "SELECT * FROM usuarios WHERE estado_usuario = 'A'"
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "No hay usuarios activos" });
    }
    return res.json(rows);
  } catch (err) {
    console.error("Error getAllUsuarios:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getOneUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conection.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "No existe el usuario" });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error("Error getOneUsuario:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if(!username || !password) return res.status(400).json({ message: "Faltan datos" })
    const [rows] = await conection.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "El usuario o la contraseña son incorrectos" });
    }
    
    const user = rows[0]
    delete user.password

    const token = jwt.sign({
      data: user
      }, secret, { expiresIn: '1h' });

    return res.status(200).json(token);
  } catch (err) {
    console.error("Error getOneUsuario:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conection.query(
      "UPDATE usuarios SET estado_usuario = 'I' WHERE id_usuario = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error deleteUsuario:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateUsuario = async (req, res) => {
  try {
    // acepta ambas variantes de parámetro
    const id = req.params.id ?? req.params.id_usuario;

    const { username, password, rol, estado_usuario, email } = req.body;

    const [result] = await conection.query(
      `UPDATE usuarios
         SET username = ?,
             password = ?,
             rol = ?,
             estado_usuario = ?,
             email = ?
       WHERE id_usuario = ?`,
      [username, password, rol, estado_usuario, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(200).json({ message: "Sin cambios (datos iguales)" });
    }

    return res.status(200).json({ message: "Usuario editado correctamente." });
  } catch (err) {
    console.error("Error updateUsuario:", err);
    return res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }
};


const createUsuario = async (req, res) => {
  try {
    const { username, password, rol, estado_usuario, email } = req.body;

    const [result] = await conection.query(
      `INSERT INTO usuarios (username, password, rol, estado_usuario, email)
       VALUES (?, ?, ?, ?, ?)`,
      [username, password, rol, estado_usuario, email]
    );

    return res
      .status(201)
      .json({ message: "Usuario creado con éxito", id: result.insertId });
  } catch (err) {
    console.error("Error createUsuario:", err);
    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  deleteUsuario,
  updateUsuario,
  createUsuario,
  login
};
