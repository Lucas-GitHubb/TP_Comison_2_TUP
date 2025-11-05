const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.use(authMiddleware); // Aplica el middleware a todas las rutas de ventas
router.get('/', ventasController.getVentas);
router.post('/', ventasController.createVenta);

module.exports = router;