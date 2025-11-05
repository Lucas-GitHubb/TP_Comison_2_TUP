const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controllers');


router.get('/', productosController.obtenerTodos);        
router.get('/:id', productosController.obtenerPorId);      
router.post('/', productosController.crearProducto);       
router.put('/:id', productosController.actualizarProducto);  
router.delete('/:id', productosController.eliminarProducto); 

module.exports = router;