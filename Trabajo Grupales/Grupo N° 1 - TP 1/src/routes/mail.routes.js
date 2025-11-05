const { Router } = require('express');
const router = Router();
const { TestMailController, EnviarRecuperacionController } = require('../controllers/mail.controller');


router.post('/test', TestMailController);// Ruta para enviar email de prueba
router.post('/recuperacion', EnviarRecuperacionController);// Ruta para enviar email de recuperación

module.exports = router;