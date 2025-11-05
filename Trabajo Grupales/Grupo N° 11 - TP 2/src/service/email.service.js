// src/services/email.service.js
// Servicio de envío de emails 

import nodemailer from 'nodemailer';
import 'dotenv/config'; 

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // Usar SSL/TLS para el puerto 465
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Función para enviar un correo electrónico.
 */
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: `"Peluquería App" <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent,
        });
        console.log(`Correo enviado a: ${to}`);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw new Error("Fallo al enviar el correo electrónico.");
    }
};