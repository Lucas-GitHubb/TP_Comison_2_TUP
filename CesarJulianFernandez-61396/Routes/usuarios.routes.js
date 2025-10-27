const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controllers');


router.get('/', usuariosController.obtenerTodos);       
router.get('/:id', usuariosController.obtenerPorId);     
router.post('/', usuariosController.crearUsuario);      
router.put('/:id', usuariosController.actualizarUsuario); 
router.delete('/:id', usuariosController.eliminarUsuario); 

module.exports = router;