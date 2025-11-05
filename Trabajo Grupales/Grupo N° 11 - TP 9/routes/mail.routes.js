import express from 'express';
import { enviar } from '../controllers/mail.controller.js';

const router = express.Router();

router.post('/send', enviar);

export default router;