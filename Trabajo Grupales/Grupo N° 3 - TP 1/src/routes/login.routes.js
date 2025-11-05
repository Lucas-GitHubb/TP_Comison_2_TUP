const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/login.controller');


router.post('/login', loginUsuario);// Ruta para login

module.exports = router;