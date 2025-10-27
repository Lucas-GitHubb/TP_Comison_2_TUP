import pool from "../config/DB.js";

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT idUsuario, nombre, email, telefono, rol, creado_en
      FROM usuarios
      ORDER BY idUsuario ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por ID
export const getOneUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT idUsuario, nombre, email, telefono, rol, creado_en
      FROM usuarios
      WHERE idUsuario = ?
      `,
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

// Crear usuario
export const createUsuario = async (req, res) => {
  const { nombre, email, telefono, rol } = req.body;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO usuarios (nombre, email, telefono, rol)
      VALUES (?, ?, ?, ?)
      `,
      [nombre, email, telefono, rol || "empleado"]
    );

    res
      .status(201)
      .json({ message: "Usuario creado correctamente", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, rol } = req.body;

  try {
    const [result] = await pool.query(
      `
      UPDATE usuarios
      SET nombre = ?, email = ?, telefono = ?, rol = ?
      WHERE idUsuario = ?
      `,
      [nombre, email, telefono, rol, id]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado para actualizar" });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE idUsuario = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
