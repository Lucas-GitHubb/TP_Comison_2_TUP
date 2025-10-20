// controllers/ventas.controller.js
const db = require('../config/DB');

const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT v.*, u.nombre as usuario_nombre FROM ventas v LEFT JOIN usuarios u ON v.usuario_id = u.id ORDER BY v.fecha DESC');
    res.json(rows);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM ventas WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Venta no encontrada' });
    const venta = rows[0];
    const [items] = await db.query('SELECT vi.*, p.nombre as producto_nombre FROM venta_items vi JOIN productos p ON vi.producto_id = p.id WHERE vi.venta_id = ?', [venta.id]);
    res.json({ ...venta, items });
  } catch (err) { next(err); }
};

/**
 * Crear venta:
 * Body:
 * {
 *   "usuario_id": 1,
 *   "items": [
 *     { "producto_id": 1, "cantidad": 2 },
 *     { "producto_id": 3, "cantidad": 1 }
 *   ]
 * }
 */
const create = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { usuario_id, items } = req.body;
    if (!items || !items.length) throw new Error('Items de la venta vacíos');

    // obtener precio actual y verificar stock
    let total = 0;
    for (const it of items) {
      const [prodRows] = await connection.query('SELECT id, precio, stock FROM productos WHERE id = ? FOR UPDATE', [it.producto_id]);
      if (!prodRows.length) throw new Error(`Producto ${it.producto_id} no existe`);
      const producto = prodRows[0];
      if (producto.stock < it.cantidad) throw new Error(`Stock insuficiente para producto ${producto.id}`);
      total += Number(producto.precio) * Number(it.cantidad);
    }

    // insertar cabecera venta
    const [ventaRes] = await connection.query('INSERT INTO ventas (usuario_id, total) VALUES (?, ?)', [usuario_id || null, total]);
    const ventaId = ventaRes.insertId;

    // insertar items y descontar stock
    for (const it of items) {
      const [prodRows] = await connection.query('SELECT precio, stock FROM productos WHERE id = ? FOR UPDATE', [it.producto_id]);
      const producto = prodRows[0];
      const precioUnit = producto.precio;
      const subtotal = precioUnit * it.cantidad;

      await connection.query('INSERT INTO venta_items (venta_id, producto_id, cantidad, precio_unit, subtotal) VALUES (?,?,?,?,?)',
        [ventaId, it.producto_id, it.cantidad, precioUnit, subtotal]);

      await connection.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [it.cantidad, it.producto_id]);
    }

    await connection.commit();

    // devolver venta creada con items
    const [ventaRows] = await db.query('SELECT * FROM ventas WHERE id = ?', [ventaId]);
    const [ventaItems] = await db.query('SELECT vi.*, p.nombre as producto_nombre FROM venta_items vi JOIN productos p ON vi.producto_id = p.id WHERE vi.venta_id = ?', [ventaId]);

    res.status(201).json({ ...ventaRows[0], items: ventaItems });

  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
};

const remove = async (req, res, next) => {
  // eliminar venta y devolver stock? por simplicidad sólo elimina (en la vida real deberías reponer stock o controlar cancelaciones)
  try {
    await db.query('DELETE FROM ventas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Venta eliminada' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, remove };
