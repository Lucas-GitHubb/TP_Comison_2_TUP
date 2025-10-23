const db = require('../config/db');


exports.getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
};


exports.createProducto = (req, res) => {
  const { nombre, talle, color, precio, stock } = req.body;

  db.query(
    'INSERT INTO productos (nombre, talle, color, precio, stock) VALUES (?, ?, ?, ?, ?)',
    [nombre, talle, color, precio, stock],
    (err, result) => {
      if (err) {
        console.error('Error al crear producto:', err);
        return res.status(500).json({ error: 'Error al crear producto' });
      }
      res.json({ id: result.insertId, nombre, talle, color, precio, stock });
    }
  );
};