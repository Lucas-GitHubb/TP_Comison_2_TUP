// src/services/email.service.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT || 2525),
  auth: {
    user: process.env.SMTP_USER || 'demo_user',
    pass: process.env.SMTP_PASS || 'demo_pass',
  },
});

async function sendPasswordResetEmail(to, token) {
  // Dejalo simple por ahora
  const url = ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token};
  return transporter.sendMail({
    from: process.env.SMTP_FROM || 'no-reply@tp.com',
    to,
    subject: 'Recuperar contraseña',
    html: <p>Usá este enlace para resetear tu password:</p><a href="${url}">${url}</a>,
  });
}

module.exports = { sendPasswordResetEmail };