const express = require('express');
const router = express.Router();
const {
  getAllCompras,
  getCompraById,
  createCompra
} = require('../controllers//compras.controller');

router.get('/', getAllCompras);
router.get('/:id', getCompraById);
router.post('/', createCompra);

module.exports = router;