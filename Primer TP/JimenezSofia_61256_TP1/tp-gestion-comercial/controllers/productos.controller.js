// controllers/productos.controller.js
const { pool } = require('../config/DB.js');

exports.listar = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, pr.nombre AS proveedor
     FROM productos p
     LEFT JOIN proveedores pr ON pr.id = p.id_proveedor
     WHERE p.activo=1`
  );
  res.json(rows);
};

exports.obtenerPorId = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(rows[0]);
};

exports.crear = async (req, res) => {
  const { nombre, sku, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo } = req.body;
  const [result] = await pool.query(
    `INSERT INTO productos (nombre, sku, id_proveedor, precio_compra, precio_venta, stock_actual, stock_minimo)
     VALUES (?,?,?,?,?,?,?)`,
    [nombre, sku, id_proveedor, precio_compra, precio_venta, stock_actual ?? 0, stock_minimo ?? 0]
  );
  res.status(201).json({ id: result.insertId, nombre, sku });
};

exports.actualizar = async (req, res) => {
  const { nombre, sku, precio_compra, precio_venta, stock_actual, stock_minimo } = req.body;
  const [result] = await pool.query(
    `UPDATE productos SET nombre=?, sku=?, precio_compra=?, precio_venta=?, stock_actual=?, stock_minimo=? WHERE id=?`,
    [nombre, sku, precio_compra, precio_venta, stock_actual, stock_minimo, req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto actualizado' });
};

exports.eliminar = async (req, res) => {
  const [result] = await pool.query('UPDATE productos SET activo=0 WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
  res.status(204).send();
};

/**
 * POST /api/productos/:id/ajuste-stock
 * Body: { "tipo": "ingreso" | "egreso" | "ajuste", "cantidad": number, "motivo": "texto opcional" }
 */
exports.ajusteStock = async (req, res) => {
  const { id } = req.params;
  let { tipo, cantidad, motivo } = req.body;

  // Validaciones simples
  if (!['ingreso', 'egreso', 'ajuste'].includes(tipo || ''))
    return res.status(400).json({ message: "tipo debe ser 'ingreso' | 'egreso' | 'ajuste'" });

  cantidad = Number(cantidad);
  if (!Number.isFinite(cantidad) || cantidad === 0)
    return res.status(400).json({ message: 'cantidad debe ser un número distinto de 0' });

  // Para 'egreso' restamos; para los demás sumamos (ajuste positivo o negativo usaría 'ajuste' con cantidad +/−)
  const delta = tipo === 'egreso' ? -Math.abs(cantidad) : cantidad;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Actualizar stock
    const [upd] = await conn.query(
      'UPDATE productos SET stock_actual = stock_actual + ? WHERE id = ?',
      [delta, id]
    );
    if (!upd.affectedRows) {
      await conn.rollback();
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Registrar movimiento (guardamos la cantidad absoluta y el tipo explica el signo)
    await conn.query(
      'INSERT INTO movimientos_stock (id_producto, tipo, cantidad, motivo) VALUES (?,?,?,?)',
      [id, tipo, Math.abs(cantidad), motivo ?? null]
    );

    // Devolver producto actualizado
    const [prod] = await conn.query('SELECT * FROM productos WHERE id=?', [id]);

    await conn.commit();
    res.json({ message: 'Stock ajustado', producto: prod[0] });
  } catch (e) {
    await conn.rollback();
    console.error(e);
    res.status(500).json({ message: 'Error al ajustar stock' });
  } finally {
    conn.release();
  }
};
