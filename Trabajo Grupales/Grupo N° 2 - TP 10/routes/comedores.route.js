import express from 'express';
import { deleteUnComedor, getAllComedores, getUnComedor, createNewComedor, modificateComedor } from '../controllers/comedores.controller.js';
import { verificarToken } from '../middleware/verificarToken.js';

const router = express.Router();

router.get('/',verificarToken, getAllComedores);
router.get('/:id',getUnComedor)
router.delete('/:id',deleteUnComedor)
router.post('/',createNewComedor)
router.put('/:id',modificateComedor)

export default router;
