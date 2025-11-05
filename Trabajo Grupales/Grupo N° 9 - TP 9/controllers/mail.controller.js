import { enviarRecuperacion as enviarEmail } from '../services/email.services.js';

export const enviar = async (req, res) => {
    const { to } = req.body;
    try {
        await enviarEmail(to);
        res.status(200).json({ mensaje: 'Email enviado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al enviar el email' });
    }
};