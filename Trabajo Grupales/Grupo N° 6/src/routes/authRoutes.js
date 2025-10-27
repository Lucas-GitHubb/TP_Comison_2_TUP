const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registrar un usuario
router.post('/register', authController.registrarUsuario);

// Iniciar sesión
router.post('/login', authController.loginUsuario);

module.exports = router;
