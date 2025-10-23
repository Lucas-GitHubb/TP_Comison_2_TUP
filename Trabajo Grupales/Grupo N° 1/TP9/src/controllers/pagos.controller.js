const pool = require('../config/DB');

// Listar todos los pagos
exports.getAll = (req, res) => {
  const sql = `
    SELECT p.id, s.nombre AS socio, d.nombre AS deporte,
           p.mes, p.anio, p.monto, p.fecha_pago
    FROM pagos p
    JOIN socios s ON s.id = p.socio_id
    JOIN deportes d ON d.id = p.deporte_id
    ORDER BY p.id DESC
  `;
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Registrar un pago
exports.create = (req, res) => {
  const { socio_id, deporte_id, mes, anio, monto } = req.body;

  if (!socio_id || !deporte_id || !mes || !anio || !monto)
    return res.status(400).json({ error: 'Faltan datos obligatorios' });

  const sql = `
    INSERT INTO pagos (socio_id, deporte_id, mes, anio, monto)
    VALUES (?, ?, ?, ?, ?)
  `;
  pool.query(sql, [socio_id, deporte_id, mes, anio, monto], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      ok: true,
      id: result.insertId,
      socio_id,
      deporte_id,
      mes,
      anio,
      monto,
    });
  });
};

// Consultar pagos de un socio
exports.getPagosDeSocio = (req, res) => {
  const { socio_id } = req.params;
  const sql = `
    SELECT p.id, d.nombre AS deporte, p.mes, p.anio, p.monto, p.fecha_pago
    FROM pagos p
    JOIN deportes d ON d.id = p.deporte_id
    WHERE p.socio_id = ?
    ORDER BY p.anio DESC, p.mes ASC
  `;
  pool.query(sql, [socio_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Consultar deuda de un socio (aÃ±o actual)
exports.getDeudaSocio = (req, res) => {
  const { socio_id } = req.params;
  const sql = `
    SELECT d.nombre AS deporte,
           d.cuota_mensual,
           COUNT(p.id) AS meses_pagados,
           (12 - COUNT(p.id)) AS meses_adeudados,
           (12 - COUNT(p.id)) * d.cuota_mensual AS total_deuda
    FROM deportes d
    JOIN socios_deportes sd ON sd.deporte_id = d.id
    LEFT JOIN pagos p
      ON p.deporte_id = d.id AND p.socio_id = sd.socio_id AND p.anio = YEAR(CURDATE())
    WHERE sd.socio_id = ?
    GROUP BY d.id
  `;
  pool.query(sql, [socio_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};