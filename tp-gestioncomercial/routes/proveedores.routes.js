const express = require('express');
const router = express.Router();
const {
  getAllProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor
} = require('../controllers/proveedores.controller');

router.get('/', getAllProveedores);
router.get('/:id', getProveedorById);
router.post('/', createProveedor);
router.put('/:id', updateProveedor);
router.delete('/:id', deleteProveedor);

module.exports = router;