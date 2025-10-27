
const db = require('../config/database');


exports.getVentas = (req, res) => {
  db.query('SELECT * FROM ventas', (err, results) => {
    if (err) {
      console.error('Error al obtener ventas:', err);
      return res.status(500).json({ error: 'Error al obtener ventas' });
    }
    res.json(results);
  });
};

exports.createVenta = (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;

 //verific. de stock
  db.query('SELECT stock FROM productos WHERE id = ?', [producto_id], (err, results) => {
    if (err) {
      console.error('Error al consultar stock:', err);
      return res.status(500).json({ error: 'Error al consultar stock' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const stockActual = results[0].cantidad;

    if (stockActual < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    db.query(
      'INSERT INTO ventas (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
      [cliente_id, producto_id, cantidad],
      (err, result) => {
        if (err) {
          console.error('Error al crear venta:', err);
          return res.status(500).json({ error: 'Error al crear venta' });
        }

        db.query(
          'UPDATE productos SET stock = stock - ? WHERE id = ?',
          [cantidad, id],
          (err2) => {
            if (err2) {
              console.error('Error al actualizar stock:', err2);
              return res.status(500).json({ error: 'Error al actualizar stock' });
            }
            res.json({ id: result.insertId, cliente_id, producto_id, cantidad });
          }
        );
      }
    );
  });
};