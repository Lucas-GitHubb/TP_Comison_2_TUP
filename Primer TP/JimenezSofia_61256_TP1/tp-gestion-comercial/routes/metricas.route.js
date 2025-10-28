const { Router } = require('express');
const ctrl = require('../controllers/metricas.controller.js');
const router = Router();

router.get('/ventas/dia', ctrl.ventasPorDia);
router.get('/ventas/mes', ctrl.ventasPorMes);
router.get('/productos/top', ctrl.topProductos);
router.get('/stock/bajo', ctrl.stockBajo);
router.get('/stock/valor', ctrl.valorStock);

module.exports = router;
