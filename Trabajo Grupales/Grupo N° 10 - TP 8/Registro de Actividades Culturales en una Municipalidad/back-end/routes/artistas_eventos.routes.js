const express = require('express');
const router = express.Router();

const {obtenerTodos, obtenerPorEvento, crear, eliminar} = require('../controllers/artistas_eventos.controllers');

router.get('/', obtenerTodos);
router.get('/evento/:eventoId', obtenerPorEvento);
router.post('/', crear);
router.delete('/:id', eliminar);

module.exports = router;