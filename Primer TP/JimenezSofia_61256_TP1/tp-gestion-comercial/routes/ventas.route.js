const { Router } = require('express');
const ctrl = require('../controllers/ventas.controller.js');
const router = Router();

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtenerPorId);
router.post('/', ctrl.crear);

module.exports = router;
