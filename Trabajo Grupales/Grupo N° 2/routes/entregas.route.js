import { Router } from 'express';
import {
  deleteEntrega,
  getEntregas,
  getOneEntrega,
  postEntrega,
  putEntrega,
} from '../controllers/entregas.controller.js';
import {
  validarCrearEntrega,
  validarActualizarEntrega,
} from '../validations/entregas.validation.js';
import { validarId } from '../validations/common.validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const route = Router();

route.get('/', getEntregas);
route.get('/:id', validarId, validateRequest, getOneEntrega);
route.post('/', validarCrearEntrega, validateRequest, postEntrega);
route.put('/:id', validarId, validarActualizarEntrega, validateRequest, putEntrega);
route.delete('/:id', validarId, validateRequest, deleteEntrega); 

export default route;
