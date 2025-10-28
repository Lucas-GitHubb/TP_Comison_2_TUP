const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Solo usuarios logueados pueden ver clientes
router.get('/', verifyToken, clienteController.obtenerClientes);

// Solo admins pueden crear clientes
router.post('/', verifyToken, verifyAdmin, clienteController.crearCliente);

module.exports = router;
