import { Router } from 'express';
import { postServicio, getServicios, getServicio, putServicio } from '../controllers/servicioController.js';

const router = Router();
router.post('/', postServicio);
router.get('/', getServicios);
router.get('/:id', getServicio);
router.put('/:id', putServicio);
export default router;