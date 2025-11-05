import express from 'express';
import { solicitarRecuperacion, resetear } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/solicitar-recuperacion', solicitarRecuperacion);
router.post('/reset-password', resetear);

export default router;