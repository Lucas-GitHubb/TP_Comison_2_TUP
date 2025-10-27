// routes/ventas.routes.js
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

// Gestión de Ventas
router.get('/', ventasController.obtenerTodas);         // GET /api/ventas (Cabeceras)
router.get('/:id', ventasController.obtenerDetalle);    // GET /api/ventas/:id (Detalle completo)
router.post('/', ventasController.crearVenta);          // POST /api/ventas (Crea la venta y maneja la transacción)
// No hay PUT ni DELETE ya que las ventas históricas no suelen modificarse o eliminarse.

module.exports = router;