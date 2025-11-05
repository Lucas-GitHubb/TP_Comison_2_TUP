const express = require('express');
const router = express.Router();

// Importaciones correctas (estás dentro de la carpeta routes)
const clienteRoutes = require('./cliente.routes');
const productoRoutes = require('./producto.routes');
const ventasRoutes = require('./ventas.routes');
const usuariosRoutes = require('./usuarios.routes');
const loginRoutes = require('./login.routes');
const mailRoutes = require('./mail.routes');

// Usar rutas con prefijos
router.use('/cliente', clienteRoutes);
router.use('/productos', productoRoutes);
router.use('/ventas', ventasRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/login', loginRoutes);
router.use('/mail', mailRoutes);

module.exports = router;