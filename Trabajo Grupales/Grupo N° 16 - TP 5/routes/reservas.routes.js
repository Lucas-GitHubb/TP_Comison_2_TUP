const express = require('express');
const { mostrarReservas, crearReserva, eliminarReserva } = require('../controllers/reservas.controller');

const router = express.Router();


router.get('/reservas', mostrarReservas);
router.post('/reservas/crearReserva', crearReserva)
router.delete('/reservas/eliminarReserva/:idReserva', eliminarReserva);

module.exports = router;
