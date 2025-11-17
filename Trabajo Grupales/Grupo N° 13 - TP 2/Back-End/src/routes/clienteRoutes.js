import { Router } from 'express';
import { postCliente, getClientes, getCliente, putCliente, eliminarCliente, } from '../controllers/clienteController.js';

const router = Router();
router.post('/', postCliente);
router.get('/', getClientes);
router.get('/:id', getCliente);
router.put('/:id', putCliente);
router.delete('/:id', eliminarCliente);

export default router;