import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = Router();

// API
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Mini formulario para probar desde el mail
router.get('/reset-password-form', (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Token no proporcionado.');

  // Form POST -> /api/auth/reset-password
  res.send(`
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Reset</title></head>
      <body style="font-family:sans-serif">
        <h2>Restablecer contraseña</h2>
        <form action="/api/auth/reset-password" method="POST">
          <input type="hidden" name="token" value="${token}" />
          <input type="password" name="newPassword" placeholder="Nueva contraseña" required />
          <button type="submit">Restablecer</button>
        </form>
      </body>
    </html>
  `);
});

export default router;