const express = require('express');
const router = express.Router();

const {obtenerVentas, obtenerVentasPorEvento, crearVenta, obtenerTotalVentas} = require('../controllers/ventas_boletos.controllers');

router.get('/', obtenerVentas);
router.get('/evento/:eventoId', obtenerVentasPorEvento);
router.get('/totales', obtenerTotalVentas);
router.post('/', crearVenta);

module.exports = router;