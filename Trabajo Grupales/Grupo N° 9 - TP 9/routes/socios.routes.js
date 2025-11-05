import express from 'express';
import { listar, obtener, crear, actualizar, eliminar } from '../controllers/socios.controller.js';
import { autenticarToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', autenticarToken, listar);
router.get('/:id', autenticarToken, obtener);
router.post('/', crear);
router.put('/:id', autenticarToken, actualizar);
router.delete('/:id', autenticarToken, eliminar);

export default router;
