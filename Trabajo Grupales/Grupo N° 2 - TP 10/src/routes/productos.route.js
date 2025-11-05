import { Router } from 'express';
import {
  getProductos,
  getProductoId,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../controllers/productos.controller.js';
import {
  validarCrearProducto,
  validarActualizarProducto,
} from '../validations/productos.validation.js';
import { validarId } from '../validations/common.validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', validarId, validateRequest, getProductoId);
router.post('/', validarCrearProducto, validateRequest, createProducto);
router.put('/:id', validarId, validarActualizarProducto, validateRequest, updateProducto);
router.delete('/:id', validarId, validateRequest, deleteProducto);

export default router;
