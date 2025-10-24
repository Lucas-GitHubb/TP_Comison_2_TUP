import pool from "../config/DB.js";

/* =========================================================
   CONTROLADOR: Ventas (cabecera y detalle)
   ========================================================= */

// Obtener todas las ventas (con nombre del usuario que la registró)
export const getAllVentas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        v.idVenta,
        v.total,
        v.fecha,
        u.nombre AS vendedor
      FROM ventas v
      LEFT JOIN usuarios u ON v.usuario_id = u.idUsuario
      ORDER BY v.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};

// Obtener una venta con su detalle
export const getOneVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const [venta] = await pool.query(
      `
      SELECT 
        v.idVenta, v.total, v.fecha,
        u.nombre AS vendedor
      FROM ventas v
      LEFT JOIN usuarios u ON v.usuario_id = u.idUsuario
      WHERE v.idVenta = ?
      `,
      [id]
    );

    if (venta.length === 0)
      return res.status(404).json({ message: "Venta no encontrada" });

    const [detalle] = await pool.query(
      `
      SELECT 
        vi.id, vi.cantidad, vi.precio_unit, vi.subtotal,
        p.nombre AS producto
      FROM venta_items vi
      JOIN productos p ON vi.producto_id = p.id
      WHERE vi.venta_id = ?
      `,
      [id]
    );

    res.json({ ...venta[0], detalle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la venta" });
  }
};

// Crear una nueva venta con sus ítems
export const createVenta = async (req, res) => {
  const { usuario_id, total, productos } = req.body;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // 1️⃣ Insertar cabecera
    const [ventaResult] = await connection.query(
      "INSERT INTO ventas (usuario_id, total) VALUES (?, ?)",
      [usuario_id, total]
    );
    const ventaId = ventaResult.insertId;

    // 2️⃣ Insertar detalle y actualizar stock
    for (const item of productos) {
      const { producto_id, cantidad, precio_unit } = item;
      const subtotal = cantidad * precio_unit;

      await connection.query(
        `
        INSERT INTO venta_items (venta_id, producto_id, cantidad, precio_unit, subtotal)
        VALUES (?, ?, ?, ?, ?)
        `,
        [ventaId, producto_id, cantidad, precio_unit, subtotal]
      );

      // Actualizar stock del producto
      await connection.query(
        `
        UPDATE productos 
        SET stock = stock - ? 
        WHERE id = ?
        `,
        [cantidad, producto_id]
      );
    }

    await connection.commit();
    res.status(201).json({ message: "Venta registrada correctamente", id: ventaId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al registrar la venta" });
  } finally {
    connection.release();
  }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar primero los ítems (por ON DELETE CASCADE no haría falta, pero es más seguro)
    await pool.query("DELETE FROM venta_items WHERE venta_id = ?", [id]);
    const [result] = await pool.query("DELETE FROM ventas WHERE idVenta = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Venta no encontrada" });

    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la venta" });
  }
};

// Total general de ventas
export const getTotalVentas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT IFNULL(SUM(total), 0) AS totalVentas FROM ventas");
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al calcular el total de ventas" });
  }
};

// Ventas por vendedor
export const getVentasPorVendedor = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        u.nombre AS vendedor,
        COUNT(v.idVenta) AS cantidadVentas,
        IFNULL(SUM(v.total), 0) AS totalVendido
      FROM ventas v
      JOIN usuarios u ON v.usuario_id = u.idUsuario
      WHERE v.usuario_id = ?
      GROUP BY u.nombre
      `,
      [id]
    );
    res.json(rows[0] || { vendedor: "Desconocido", cantidadVentas: 0, totalVendido: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas por vendedor" });
  }
};

// Ventas por fecha específica
export const getVentasPorFecha = async (req, res) => {
  const { fecha } = req.query;
  try {
    const [rows] = await pool.query(
      `
      SELECT DATE(fecha) AS dia, SUM(total) AS totalVendido
      FROM ventas
      WHERE DATE(fecha) = ?
      GROUP BY dia
      `,
      [fecha]
    );
    res.json(rows[0] || { dia: fecha, totalVendido: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas por fecha" });
  }
};
