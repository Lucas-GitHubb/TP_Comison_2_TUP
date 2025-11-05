const express = require('express');
const { getLibros, getLibrosPorId, crearLibro, actualizarLibro, eliminarLibro } = require('../controllers/libros.controller');

const router = express.Router();

router.get('/libros', getLibros);
router.get('/libros/:id_libro', getLibrosPorId);
router.post('/libro', crearLibro);
router.put('/libro', actualizarLibro);
router.delete('/libro', eliminarLibro);

module.exports = router;