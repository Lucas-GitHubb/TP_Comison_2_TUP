
import transporter from "../config/nodemailer.js";

const enviarEmailDeBievenida = async (correoUsuario, nombreUsuario = "Usuario") => {
  const mailOptions = {
    from: "martincardozo1993xp@gmail.com",
    to: correoUsuario,
    subject: "¡Bienvenido al Centro de Salud! 🏥",
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">¡Bienvenido al Centro de Salud! 🏥</h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333333; margin-top: 0;">Hola ${correoUsuario},</h2>
                    <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                      Estamos <strong>encantados</strong> de tenerte con nosotros. Tu cuenta ha sido creada exitosamente y ya puedes comenzar a disfrutar de nuestros servicios.
                    </p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0;">
                      <p style="color: #333333; margin: 0; font-size: 15px;">
                        <strong>¿Qué puedes hacer ahora?</strong>
                      </p>
                      <ul style="color: #666666; margin: 10px 0 0 0; padding-left: 20px;">
                        <li>Agendar citas médicas</li>
                        <li>Consultar tu historial clínico</li>
                        <li>Ver resultados de estudios</li>
                        <li>Contactar con profesionales de la salud</li>
                      </ul>
                    </div>
                    
                    <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                      Si tienes alguna pregunta o necesitas ayuda, nuestro equipo está disponible para asistirte.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://tucentrodesalud.com/login" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">
                        Iniciar Sesión
                      </a>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
                      Centro de Salud - Tu bienestar es nuestra prioridad
                    </p>
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      Este es un correo automático, por favor no responder directamente.
                    </p>
                    <div style="margin-top: 15px;">
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 12px;">Política de Privacidad</a>
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 12px;">Términos y Condiciones</a>
                    </div>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hola ${nombreUsuario},\n\nBienvenido al Centro de Salud! Estamos encantados de tenerte con nosotros. Tu cuenta ha sido creada exitosamente.\n\n¿Qué puedes hacer ahora?\n- Agendar citas médicas\n- Consultar tu historial clínico\n- Ver resultados de estudios\n- Contactar con profesionales de la salud\n\nCentro de Salud - Tu bienestar es nuestra prioridad`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de bienvenida enviado a ${correoUsuario}`);
  } catch (error) {
    console.error(`Error al enviar el email de bienvenida: ${error}`);
  }
};

export default enviarEmailDeBievenida;
