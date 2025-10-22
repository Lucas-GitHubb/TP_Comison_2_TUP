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
import { validateRequest } from '../middlewares/validateRequest.js';

const route = Router();

route.get('/', getDonadores);
route.get('/:id', getOneDonador);
route.post('/', validarCrearDonador, validateRequest, postDonadores);
route.put('/:id', validarActualizarDonador, validateRequest, putDonadores);
route.delete('/:id', deleteDonadores);

export default route;
