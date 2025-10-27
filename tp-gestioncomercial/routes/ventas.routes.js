const express = require('express');
const router = express.Router();
const {
  getAllVentas,
  getVentaById,
  createVenta,
  updateEstadoVenta
} = require('../controllers/ventas.controller');

router.get('/', getAllVentas);
router.get('/:id', getVentaById);
router.post('/', createVenta);
router.patch('/:id/estado', updateEstadoVenta);

module.exports = router;