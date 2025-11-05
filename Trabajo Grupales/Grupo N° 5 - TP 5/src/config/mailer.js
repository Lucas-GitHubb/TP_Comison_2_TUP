const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

function enviarCorreo(email, nombre, link, callback) {
  const mailOptions = {
    from: `"Gimnasio Grupo 7" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Hola ${nombre}, haz click en este enlace para restablecer tu contraseña: ${link}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return callback(err);
    callback(null, info);
  });
}

module.exports = { enviarCorreo };
