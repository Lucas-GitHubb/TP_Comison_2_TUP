import { enviarMailTest } from "../service/email.service.js";

export const mailTestController = async (req, res) => {
  const { mail } = req.body;

  try {
    await enviarMailTest(mail);
    res.status(200).json({ message: 'Email enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).json({ message: 'Error al enviar el email' });
  }
};
