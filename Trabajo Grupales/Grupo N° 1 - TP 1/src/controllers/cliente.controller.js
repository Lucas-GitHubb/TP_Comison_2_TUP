const db = require('../config/database');

exports.getClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => { 
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).json({ error: 'Error al obtener clientes' });
    }
    res.json(results);
  });
};

exports.createCliente = (req, res) => {
  const { nombre, telefono, mail } = req.body;

  db.query(
    'INSERT INTO clientes (nombre, telefono, mail) VALUES (?, ?, ?)',
    [nombre, telefono, mail],
    (err, result) => {
      if (err) {
        console.error('Error al crear cliente:', err);
        return res.status(500).json({ error: 'Error al crear cliente' });
      }
      res.json({ id: result.insertId, nombre, telefono, mail });
    }
  );
};
