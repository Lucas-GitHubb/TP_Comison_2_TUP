import { pool } from "../config/DB.js";

export const obtenerMetricas = async (req, res) => {
  const [[{ total_ventas }]] = await pool.query("SELECT SUM(total) AS total_ventas FROM ventas");
  const [[{ total_productos }]] = await pool.query("SELECT COUNT(*) AS total_productos FROM productos");
  const [[{ total_usuarios }]] = await pool.query("SELECT COUNT(*) AS total_usuarios FROM usuarios");

  res.json({
    total_ventas,
    total_productos,
    total_usuarios,
  });
};
