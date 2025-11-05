import { Router } from 'express';
import {
  getDonadores,
  postDonadores,
  putDonadores,
  deleteDonadores,
  getOneDonador,
} from '../controllers/donadores.controller.js';
import {
  validarCrearDonador,
  validarActualizarDonador,
} from '../validations/donadores.validation.js';
import { validarId } from '../validations/common.validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const route = Router();

route.get('/', getDonadores);
route.get('/:id', validarId, validateRequest, getOneDonador); 
route.post('/', validarCrearDonador, validateRequest, postDonadores);
route.put('/:id', validarId, validarActualizarDonador, validateRequest, putDonadores); 
route.delete('/:id', validarId, validateRequest, deleteDonadores); 

export default route;
