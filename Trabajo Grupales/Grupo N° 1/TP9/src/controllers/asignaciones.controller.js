const pool = require('../config/DB');

// Listar todas las asignaciones
exports.getAll = (req, res) => {
  const sql = `
    SELECT sd.id,
           s.id AS socio_id, s.nombre AS socio_nombre, s.dni,
           d.id AS deporte_id, d.nombre AS deporte_nombre, d.cuota_mensual,
           sd.fecha_inscripcion
    FROM socios_deportes sd
    JOIN socios s ON s.id = sd.socio_id
    JOIN deportes d ON d.id = sd.deporte_id
    ORDER BY sd.id DESC
  `;
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener deportes de un socio
exports.getDeportesDeSocio = (req, res) => {
  const { socio_id } = req.params;
  const sql = `
    SELECT d.id, d.nombre, d.cuota_mensual, sd.fecha_inscripcion
    FROM socios_deportes sd
    JOIN deportes d ON d.id = sd.deporte_id
    WHERE sd.socio_id = ?
  `;
  pool.query(sql, [socio_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener socios de un deporte
exports.getSociosDeDeporte = (req, res) => {
  const { deporte_id } = req.params;
  const sql = `
    SELECT s.id, s.nombre, s.dni, s.telefono, s.email, sd.fecha_inscripcion
    FROM socios_deportes sd
    JOIN socios s ON s.id = sd.socio_id
    WHERE sd.deporte_id = ?
  `;
  pool.query(sql, [deporte_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Asignar un socio a un deporte
exports.asignar = (req, res) => {
  const { socio_id, deporte_id } = req.body;
  if (!socio_id || !deporte_id)
    return res.status(400).json({ error: 'socio_id y deporte_id son requeridos' });

  const sql = 'INSERT INTO socios_deportes (socio_id, deporte_id) VALUES (?, ?)';
  pool.query(sql, [socio_id, deporte_id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El socio ya está asignado a ese deporte' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ ok: true, id: result.insertId, socio_id, deporte_id });
  });
};

// Desasignar un socio de un deporte
exports.desasignar = (req, res) => {
  const { socio_id, deporte_id } = req.body;
  if (!socio_id || !deporte_id)
    return res.status(400).json({ error: 'socio_id y deporte_id son requeridos' });

  const sql = 'DELETE FROM socios_deportes WHERE socio_id = ? AND deporte_id = ?';
  pool.query(sql, [socio_id, deporte_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'No existía esa asignación' });
    res.json({ ok: true, mensaje: 'Socio desasignado del deporte correctamente' });
  });
};
