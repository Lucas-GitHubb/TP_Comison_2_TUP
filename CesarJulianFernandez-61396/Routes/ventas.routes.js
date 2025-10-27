const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controllers');


router.get('/', ventasController.obtenerTodas);  
router.get('/:id', ventasController.obtenerDetalle);   
router.post('/', ventasController.crearVenta);          

module.exports = router;