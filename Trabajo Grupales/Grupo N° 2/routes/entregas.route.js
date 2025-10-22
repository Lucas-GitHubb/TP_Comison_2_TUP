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
import { validateRequest } from '../middlewares/validateRequest.js';

const route = Router();

route.get('/', getEntregas);
route.get('/:id', getOneEntrega);
route.post('/', validarCrearEntrega, validateRequest, postEntrega);
route.put('/:id', validarActualizarEntrega, validateRequest, putEntrega);
route.delete('/:id', deleteEntrega);

export default route;
