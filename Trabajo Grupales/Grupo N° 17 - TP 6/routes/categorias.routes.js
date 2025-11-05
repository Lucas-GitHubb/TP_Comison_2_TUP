const express = require('express');
const { getCategorias, getCategoriasPorId, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias.controller');

const router = express.Router();

router.get('/categorias', getCategorias);
router.get('/categoria/id', getCategoriasPorId);
router.post('/categoria', crearCategoria);
router.put('/categoria', actualizarCategoria);
router.delete('/categoria', eliminarCategoria);

module.exports = router;