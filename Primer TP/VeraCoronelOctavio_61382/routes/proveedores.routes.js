// routes/proveedores.routes.js
const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');

// CRUD Proveedores
router.get('/', proveedoresController.obtenerTodos);         // GET /api/proveedores
router.get('/:id', proveedoresController.obtenerPorId);       // GET /api/proveedores/:id
router.post('/', proveedoresController.crearProveedor);      // POST /api/proveedores
router.put('/:id', proveedoresController.actualizarProveedor); // PUT /api/proveedores/:id
router.delete('/:id', proveedoresController.eliminarProveedor); // DELETE /api/proveedores/:id

module.exports = router;