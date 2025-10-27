// routes/productos.routes.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// CRUD Productos
router.get('/', productosController.obtenerTodos);        // GET /api/productos
router.get('/:id', productosController.obtenerPorId);      // GET /api/productos/:id
router.post('/', productosController.crearProducto);       // POST /api/productos
router.put('/:id', productosController.actualizarProducto);  // PUT /api/productos/:id
router.delete('/:id', productosController.eliminarProducto); // DELETE /api/productos/:id

module.exports = router;