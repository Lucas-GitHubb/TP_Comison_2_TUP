import { pool } from "../config/db.js";

export const listar = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT v.*, u.nombre as usuario FROM ventas v LEFT JOIN usuarios u ON v.id_usuario = u.id ORDER BY v.id DESC`
  );
  res.json(rows);
};

export const obtener = async (req, res) => {
  const [venta] = await pool.query("SELECT * FROM ventas WHERE id=?", [
    req.params.id,
  ]);
  if (!venta.length) return res.status(404).json({ error: "No encontrada" });
  const [detalle] = await pool.query(
    "SELECT * FROM venta_detalle WHERE id_venta=?",
    [req.params.id]
  );
  res.json({ ...venta[0], detalle });
};

export const crear = async (req, res) => {
  const { id_usuario, productos } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [r] = await conn.query("INSERT INTO ventas (id_usuario) VALUES (?)", [
      id_usuario,
    ]);
    const id_venta = r.insertId;
    for (const p of productos) {
      await conn.query(
        "INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario) VALUES (?,?,?,?)",
        [id_venta, p.id_producto, p.cantidad, p.precio_unitario]
      );
      await conn.query(
        "INSERT INTO stock_movimientos (id_producto, tipo, cantidad, motivo, ref_id) VALUES (?, 'SALIDA', ?, 'venta', ?) ",
        [p.id_producto, p.cantidad, id_venta]
      );
    }
    await conn.commit();
    res.status(201).json({ id: id_venta });
  } catch (e) {
    await conn.rollback();
    res
      .status(500)
      .json({ error: "Error al registrar venta", detalle: e.message });
  } finally {
    conn.release();
  }
};

export const eliminar = async (req, res) => {
  await pool.query("DELETE FROM venta_detalle WHERE id_venta=?", [
    req.params.id,
  ]);
  await pool.query("DELETE FROM ventas WHERE id=?", [req.params.id]);
  res.json({ ok: true });
};