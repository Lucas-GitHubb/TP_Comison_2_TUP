import express from 'express';
import {
  getAllComedores,
  getUnComedor,
  deleteUnComedor,
  createNewComedor,
  modificateComedor,
} from '../controllers/comedores.controller.js';
import {
  validarCrearComedor,
  validarActualizarComedor,
} from '../validations/comedores.validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { validarId } from '../validations/common.validation.js';

const router = express.Router();

router.get('/', getAllComedores);
router.get('/:id', validarId, validateRequest, getUnComedor); 
router.delete('/:id', validarId, validateRequest, deleteUnComedor); 
router.post('/', validarCrearComedor, validateRequest, createNewComedor);
router.put('/:id', validarId, validarActualizarComedor, validateRequest, modificateComedor);

export default router;
