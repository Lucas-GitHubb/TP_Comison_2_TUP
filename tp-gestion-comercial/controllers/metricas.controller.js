// controllers/metricas.controller.js
const db = require('../config/DB');

// Obtener métricas
const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM metricas ORDER BY fecha DESC');
    res.json(rows);
  } catch (err) { next(err); }
};

// Obtener por clave
const getByClave = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM metricas WHERE clave = ? ORDER BY fecha DESC', [req.params.clave]);
    res.json(rows);
  } catch (err) { next(err); }
};

// Agregar métrica (por ejemplo, actualizar KPI manual)
const create = async (req, res, next) => {
  try {
    const { clave, valor, descripcion } = req.body;
    const [result] = await db.query('INSERT INTO metricas (clave, valor, descripcion) VALUES (?,?,?)', [clave, valor, descripcion]);
    const [rows] = await db.query('SELECT * FROM metricas WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

module.exports = { getAll, getByClave, create };
