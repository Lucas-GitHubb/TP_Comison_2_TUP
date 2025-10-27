import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
/*
const sendEmail = async (to) => {
    try {
        const info = await transporter.sendMail({  
            from: process.env.SMTP_USER,
            to: to,
            subject: "Email from Club Deportivo - ",
            text:"hola",
            html: `<b>Hola!!</b>`
        });
        return info;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   
*/
const recuperarcontraseña = async (Email, link) => {
    const htmltemplate = `
    <h1>Recuperar Contraseña</h1>
    <p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
    <a href="${link}">Restablecer Contraseña</a>
    `;

    try {
        const info = await transporter.sendMail({
            from: `soporte <${process.env.SMTP_USER}>`,
            to: Email,
            subject: 'Recuperación de Contraseña',
            html: htmltemplate,
        });
        return info;
    } catch (error) {
        console.error('Error enviando email de recuperación:', error);
        throw error;
    }
};

export { recuperarcontraseña, recuperarcontraseña as enviarRecuperacion };