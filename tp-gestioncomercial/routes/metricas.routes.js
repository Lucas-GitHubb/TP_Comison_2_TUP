const express = require('express');
const router = express.Router();
const {
  getVentasTotales,
  getProductosMasVendidos
} = require('../controllers/metricas.controller');

router.get('/ventas-totales', getVentasTotales);
router.get('/productos-mas-vendidos', getProductosMasVendidos);

module.exports = router;