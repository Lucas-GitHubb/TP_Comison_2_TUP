const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.MAIL_PORT || '587', 10),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendMail({ to, subject, html, text }) {
  const msg = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(msg);
}

async function sendPasswordReset(to, token) {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  const subject = 'Password reset request';
  const html = `<p>Para resetear tu contraseña haga click <a href="${resetUrl}">aquí</a></p>`;
  const text = `Ir a: ${resetUrl}`;
  return sendMail({ to, subject, html, text });
}

module.exports = { sendMail, sendPasswordReset };
