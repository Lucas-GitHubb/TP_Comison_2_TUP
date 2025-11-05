import { Router } from 'express';
import { postTurno, getTurnosDelDia, patchEstadoTurno, putReprogramarTurno, getHistorialCliente } from '../controllers/turnoController.js';

const router = Router();
router.post('/', postTurno);
router.get('/', getTurnosDelDia);
router.patch('/:id/estado', patchEstadoTurno);
router.put('/:id', putReprogramarTurno);
router.get('/cliente/:id', getHistorialCliente);
export default router;