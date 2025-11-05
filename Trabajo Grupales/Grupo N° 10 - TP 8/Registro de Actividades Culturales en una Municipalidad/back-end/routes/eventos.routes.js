const express = require('express');
const router = express.Router();
const {
    getAllEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento,
    AgregarArtistaEvento,
    venderBoletos
} = require('../controllers/eventos.controllers');

router.get('/', getAllEventos);
router.get('/:id', getEventoById);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);
router.post('/:eventoId/artistas/:artistaId', AgregarArtistaEvento);
router.post('/:eventoId/ventas', venderBoletos);

module.exports = router;