import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10), 
    secure: parseInt(process.env.EMAIL_PORT || '587', 10) === 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendEmail = async (to, subject, html, text = '') => {
    try {
        const mailOptions = {
            from: `"Nombre de tu App" <${process.env.EMAIL_USER}>`, 
            to: to, 
            subject: subject, 
            text: text, 
            html: html, 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error('No se pudo enviar el correo.');
    }
};
