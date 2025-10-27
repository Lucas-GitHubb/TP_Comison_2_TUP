import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const enviarMailTest = async (to) => {
  return transporter.sendMail({
    from: `"Servidor de Prueba" <${process.env.SMTP_USER}>`,
    to: to,
    subject: 'Email de prueba desde Node.js',
    text: 'Hola, este es un email de prueba enviado desde Node.js usando Nodemailer.',
    html: '<b>Hola, este es un email de prueba enviado desde Node.js usando Nodemailer.</b>'
  });
};

export const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Soporte" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};