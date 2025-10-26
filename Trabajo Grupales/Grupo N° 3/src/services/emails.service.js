const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarMailTest = async (to) => {
    try {
        const info = await transporter.sendMail({
            from: `Servidor de pruebas <${process.env.EMAIL_USER}>`,
            to: to || "omegasuprime2585@gmail.com",
            subject: "Email de prueba",
            text: "Este es un email de prueba enviado desde el servidor Node.js usando Nodemailer",
            html: "<h1>Hola!</h1><p>Este es un email de prueba enviado desde el servidor Node.js usando Nodemailer</p>"
        });
        console.log('✅ Email de prueba enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error al enviar email de prueba:', error);
        throw error;
    }
};

const enviarRecuperacionPassword = async (mail, link) => {
    
    try {
        const info = await transporter.sendMail({
            from: `Sistema de Gestión <${process.env.EMAIL_USER}>`,
            // 💡 MEJORA: Se añadió el fallback para evitar el fallo si 'mail' es nulo
            to: mail || "omegasuprime2585@gmail.com", 
            subject: "🔐 Recuperación de Contraseña",
            text: "Este es un email de recuperacion de clave Node.js usando Nodemailer",
            html: "<h1>Hola!</h1><p>Este es un email de recuperacion de clave Node.js usando Nodemailer</p>"

        });
        console.log('✅ Email de recuperación enviado a:', mail);
        return info;
    } catch (error) {
        console.error('❌ Error al enviar email de recuperación:', error);
        throw error;
    }
};


module.exports = {
    enviarMailTest,
    enviarRecuperacionPassword,
};