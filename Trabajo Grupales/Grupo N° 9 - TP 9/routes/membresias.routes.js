import express from 'express';
import { listar, obtener, crear, eliminar } from '../controllers/membresias.controller.js';
import { autenticarToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', autenticarToken, listar);
router.get('/:id', autenticarToken, obtener);
router.post('/', autenticarToken, crear);
router.delete('/:id', autenticarToken, eliminar);

export default router;
