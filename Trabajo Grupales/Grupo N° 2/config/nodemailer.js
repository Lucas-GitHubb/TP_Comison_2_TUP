import nodemailer from 'nodemailer';

//creamos el servicio para poder utilizar el email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "martincardozo1993xp@gmail.com",
    pass: "radt cwvs dzxs tead"
  }
});

export const recuperarContraseña = async (correoUsuario, link) => {
  const htmlTemplate = `
    <html>
      <body>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${link}">Restablecer Contraseña</a>
      </body>
    </html>
  `;

  const mailOptions = {
    from: "martincardozo1993xp@gmail.com",
    to: correoUsuario,
    subject: "Recuperación de Contraseña",
    html: htmlTemplate
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${correoUsuario}`);
  } catch (error) {
    console.error(`Error al enviar el correo: ${error}`);
  }
}

export default transporter;


