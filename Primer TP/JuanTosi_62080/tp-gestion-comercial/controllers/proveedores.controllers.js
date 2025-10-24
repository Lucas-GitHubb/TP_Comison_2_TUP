import pool from "../config/DB.js";

// Obtener todos los proveedores
export const getAllProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT idProveedor, nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor, creado_en
      FROM proveedores
      ORDER BY nombreProveedor ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los proveedores" });
  }
};

// Obtener un proveedor por ID
export const getOneProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT idProveedor, nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor
      FROM proveedores
      WHERE idProveedor = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el proveedor" });
  }
};

// Crear proveedor
export const createProveedor = async (req, res) => {
  const { nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor } = req.body;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO proveedores (nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor)
      VALUES (?, ?, ?, ?)
      `,
      [nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor]
    );

    res.status(201).json({
      message: "Proveedor creado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el proveedor" });
  }
};

// Actualizar proveedor
export const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor } = req.body;

  try {
    const [result] = await pool.query(
      `
      UPDATE proveedores
      SET nombreProveedor = ?, contactoProveedor = ?, telefonoProveedor = ?, direccionProveedor = ?
      WHERE idProveedor = ?
      `,
      [nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({ message: "Proveedor actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el proveedor" });
  }
};

// Eliminar proveedor
export const deleteProveedor = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM proveedores WHERE idProveedor = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el proveedor" });
  }
};
