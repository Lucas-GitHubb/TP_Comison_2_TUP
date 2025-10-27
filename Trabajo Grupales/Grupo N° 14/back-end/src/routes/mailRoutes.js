import express from 'express';
import { mailTestController } from '../controllers/mailController.js';

const router = express.Router();


router.post('/test', mailTestController)

export default router;
