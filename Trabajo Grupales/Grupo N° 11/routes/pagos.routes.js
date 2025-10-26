import express from 'express';
import { listar, deudas, registrar } from '../controllers/pagos.controller.js';
import { autenticarToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', autenticarToken, listar);
router.get('/deudas/:socioId', autenticarToken, deudas);
router.post('/', autenticarToken, registrar);

export default router;
