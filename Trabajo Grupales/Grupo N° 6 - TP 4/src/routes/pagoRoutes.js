const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.post('/planes-pago', pagoController.crearPlanDePago);

router.put('/cuotas/:id/pagar', pagoController.marcarCuotaComoPagada);

router.get('/reportes/cliente/:clienteId', pagoController.generarReporteCliente);

module.exports = router;