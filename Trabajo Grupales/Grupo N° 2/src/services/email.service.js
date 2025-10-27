
import nodemailer from 'nodemailer';
import 'dotenv/config'; // carga variables de entorno automáticamente

// Configurar el transporte de correo
const transportador = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.ejemplo.com',
  port: parseInt(process.env.MAIL_PORT || '587', 10),
  secure: process.env.MAIL_SECURE === 'true', // true si usa TLS/SSL
  auth: {
    user: process.env.MAIL_USER, // usuario del correo
    pass: process.env.MAIL_PASS, // contraseña del correo
  },
});

// Función genérica para enviar un correo
export async function enviarCorreo({ para, asunto, html, texto }) {
  const mensaje = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER, // remitente
    to: para, // destinatario
    subject: asunto,
    text: texto,
    html,
  };

  return transportador.sendMail(mensaje);
}

// Función específica para enviar email de reseteo de contraseña
export async function enviarReseteoContrasena(para, token) {
  const urlReset = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  const asunto = 'Solicitud de reseteo de contraseña';
  const html = `<p>Para resetear tu contraseña haga click <a href="${urlReset}">aquí</a></p>`;
  const texto = `Ir a: ${urlReset}`;
  return enviarCorreo({ para, asunto, html, texto });
}
