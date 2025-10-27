// routes/metricas.routes.js
const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller');

// Endpoints de Métricas (Lectura de datos agregados)
router.get('/top-vendedores', metricasController.topVendedores); // GET /api/metricas/top-vendedores
router.get('/stock-critico', metricasController.stockCritico);   // GET /api/metricas/stock-critico
router.get('/ventas-por-dia', metricasController.ventasPorDia);  // GET /api/metricas/ventas-por-dia

module.exports = router;