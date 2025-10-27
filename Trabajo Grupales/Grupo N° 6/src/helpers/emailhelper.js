// src/helpers/emailHelper.js
const transporter = require('../config/emailconfig');

const enviarCorreo = async (destinatario, asunto, mensajeHTML) => {
  try {
    const mailOptions = {
      from: `"Sistema de Pagos" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      html: mensajeHTML
    };

    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a: ${destinatario}`);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};

module.exports = enviarCorreo;

