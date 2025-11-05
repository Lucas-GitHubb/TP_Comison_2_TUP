import express from 'express';
import { listar, obtener, crear, actualizar, eliminar } from '../controllers/deportes.controller.js';
import { autenticarToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', listar);
router.get('/:id', obtener);
router.post('/', autenticarToken, crear);
router.put('/:id', autenticarToken, actualizar);
router.delete('/:id', autenticarToken, eliminar);

export default router;
