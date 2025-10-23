const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagos.controller');

// Listar todos los pagos
router.get('/', pagosController.getAll);

// Registrar pago
router.post('/', pagosController.create);

// Pagos por socio
router.get('/socio/:socio_id', pagosController.getPagosDeSocio);

// Deuda del socio
router.get('/deuda/:socio_id', pagosController.getDeudaSocio);

module.exports = router;