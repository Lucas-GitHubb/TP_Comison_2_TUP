const express = require('express'); 

const { mostrarSocios, crearSocio, modificarSocio,eliminarSocio} = require('../controllers/socios.controller');

const router = express.Router();

router.get('/socios', mostrarSocios);
router.post('/socios/crearSocio', crearSocio);
router.put('/socios/modificarSocio/:id', modificarSocio);
router.delete('/socios/eliminarSocio/:id', eliminarSocio);


module.exports = router;