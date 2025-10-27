const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// CRUD de Usuarios/Empleados
router.get('/', usuariosController.obtenerTodos);       // GET /api/usuarios
router.get('/:id', usuariosController.obtenerPorId);     // GET /api/usuarios/:id
router.post('/', usuariosController.crearUsuario);      // POST /api/usuarios
router.put('/:id', usuariosController.actualizarUsuario); // PUT /api/usuarios/:id
router.delete('/:id', usuariosController.eliminarUsuario); // DELETE /api/usuarios/:id

module.exports = router;