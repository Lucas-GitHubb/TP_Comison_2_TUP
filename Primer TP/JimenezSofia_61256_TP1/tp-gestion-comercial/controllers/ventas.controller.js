const { pool } = require('../config/DB.js');

exports.listar = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM ventas ORDER BY id DESC');
  res.json(rows);
};

exports.obtenerPorId = async (req, res) => {
  const [cab] = await pool.query('SELECT * FROM ventas WHERE id=?', [req.params.id]);
  const [det] = await pool.query('SELECT * FROM venta_detalle WHERE id_venta=?', [req.params.id]);
  res.json({ venta: cab[0], detalle: det });
};

exports.crear = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { id_usuario, items } = req.body;
    await conn.beginTransaction();

    const total = items.reduce((acc, i) => acc + i.precio_unitario * i.cantidad, 0);
    const [venta] = await conn.query('INSERT INTO ventas (id_usuario, total) VALUES (?,?)', [id_usuario, total]);

    for (const i of items) {
      await conn.query(
        'INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?,?,?,?,?)',
        [venta.insertId, i.id_producto, i.cantidad, i.precio_unitario, i.cantidad * i.precio_unitario]
      );
      await conn.query('UPDATE productos SET stock_actual = stock_actual - ? WHERE id=?', [i.cantidad, i.id_producto]);
    }

    await conn.commit();
    res.status(201).json({ message: 'Venta registrada' });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ message: e.message });
  } finally {
    conn.release();
  }
};
