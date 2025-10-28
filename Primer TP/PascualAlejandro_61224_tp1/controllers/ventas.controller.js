import { pool } from "../config/db.js";

/**
 * Crea una venta con detalles y descuenta stock (transacción).
 * body: { cliente_nombre?, usuario_id?, items: [{producto_id, cantidad, precio_unitario}] }
 */
export async function createVenta(req, res, next) {
  const conn = await pool.getConnection();
  try {
    const { cliente_nombre = null, usuario_id = null, items = [] } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items requeridos" });
    }

    await conn.beginTransaction();

    // total
    const total = items.reduce((acc, it) => acc + Number(it.precio_unitario) * Number(it.cantidad), 0);

    const [ventaRes] = await conn.query(
      `INSERT INTO ventas (fecha, cliente_nombre, usuario_id, total)
       VALUES (NOW(), :cliente_nombre, :usuario_id, :total)`,
      { cliente_nombre, usuario_id, total }
    );
    const ventaId = ventaRes.insertId;

    for (const it of items) {
      const [prodRows] = await conn.query(
        "SELECT stock FROM productos WHERE id=:id FOR UPDATE",
        { id: it.producto_id }
      );
      if (!prodRows.length) {
        throw new Error(`Producto ${it.producto_id} inexistente`);
      }
      const nuevoStock = Number(prodRows[0].stock) - Number(it.cantidad);
      if (nuevoStock < 0) {
        throw new Error(`Stock insuficiente para producto ${it.producto_id}`);
      }

      await conn.query(
        `INSERT INTO venta_detalles (venta_id, producto_id, cantidad, precio_unitario, subtotal)
         VALUES (:venta_id, :producto_id, :cantidad, :precio_unitario, :subtotal)`,
        {
          venta_id: ventaId,
          producto_id: it.producto_id,
          cantidad: it.cantidad,
          precio_unitario: it.precio_unitario,
          subtotal: Number(it.precio_unitario) * Number(it.cantidad)
        }
      );

      await conn.query(
        "UPDATE productos SET stock=:stock WHERE id=:id",
        { stock: nuevoStock, id: it.producto_id }
      );
    }

    await conn.commit();
    res.status(201).json({ id: ventaId, total });
  } catch (e) {
    await conn.rollback();
    next(e);
  } finally {
    conn.release();
  }
}

export async function list(_req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT v.id, v.fecha, v.cliente_nombre, v.usuario_id, v.total, u.nombre AS vendedor
       FROM ventas v
       LEFT JOIN usuarios u ON u.id = v.usuario_id
       ORDER BY v.fecha DESC`
    );
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const ventaId = req.params.id;
    const [[venta]] = await pool.query(
      `SELECT v.id, v.fecha, v.cliente_nombre, v.usuario_id, v.total
       FROM ventas v WHERE v.id=:id`,
      { id: ventaId }
    );
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });

    const [items] = await pool.query(
      `SELECT d.id, d.producto_id, p.nombre AS producto, d.cantidad, d.precio_unitario, d.subtotal
       FROM venta_detalles d
       JOIN productos p ON p.id = d.producto_id
       WHERE d.venta_id=:venta_id`,
      { venta_id: ventaId }
    );

    res.json({ ...venta, items });
  } catch (e) { next(e); }
}
