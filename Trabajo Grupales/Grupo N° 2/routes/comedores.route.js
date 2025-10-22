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

const router = express.Router();

router.get('/', getAllComedores);
router.get('/:id', getUnComedor);
router.delete('/:id', deleteUnComedor);
router.post('/', validarCrearComedor, validateRequest, createNewComedor);
router.put('/:id', validarActualizarComedor, validateRequest, modificateComedor);

export default router;
