import { Router } from 'express';
import { postCliente, getClientes, getCliente, putCliente } from '../controllers/clienteController.js';

const router = Router();
router.post('/', postCliente);
router.get('/', getClientes);
router.get('/:id', getCliente);
router.put('/:id', putCliente);
export default router;