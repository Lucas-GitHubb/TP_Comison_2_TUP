const express = require('express');
const router = express.Router();
const asignacionesController = require('../controllers/asignaciones.controller');

// Listar todas las asignaciones
router.get('/', asignacionesController.getAll);
// Deportes de un socio
router.get('/socio/:socio_id', asignacionesController.getDeportesDeSocio);
// Socios de un deporte
router.get('/deporte/:deporte_id', asignacionesController.getSociosDeDeporte);
// Asignar socio a deporte
router.post('/', asignacionesController.asignar);
// Desasignar socio de deporte
router.delete('/', asignacionesController.desasignar);

module.exports = router;
