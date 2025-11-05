const { Router } = require('express');
const ctrl = require('../controllers/productos.controller.js');
const router = Router();

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtenerPorId);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar);
router.delete('/:id', ctrl.eliminar);
router.post('/:id/ajuste-stock', ctrl.ajusteStock);

module.exports = router;
