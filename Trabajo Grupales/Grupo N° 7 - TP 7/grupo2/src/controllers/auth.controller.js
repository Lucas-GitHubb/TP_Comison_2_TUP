import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import pool from '../config/db.js';
import { sendEmail } from '../services/email.service.js';

dotenv.config();

const register = async (req, res) => {
    const { email, password } = req.body;
    const { nombre, apellido, fechaNacimiento, telefono, direccion, sexo } = req.body;

    if (!email || !password || !nombre || !apellido || !fechaNacimiento || !telefono || !direccion || !sexo) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [existingUser] = await connection.query(
            'SELECT idUsuario FROM usuarios WHERE MailUsuario = ? LIMIT 1',
            [email]
        );

        if (existingUser.length > 0) {
            await connection.rollback();
            connection.release();
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const [userResult] = await connection.query(
            'INSERT INTO usuarios (MailUsuario, PasswordUsuario, RolUsuario) VALUES (?, ?, ?)',
            [email, hashedPassword, 'Paciente']
        );

        const newUserId = userResult.insertId;

        await connection.query(
            'INSERT INTO pacientes (NombrePaciente, ApellidoPaciente, FechaNacPaciente, TelefonoPaciente, DireccionPaciente, SexoPaciente, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, fechaNacimiento, telefono, direccion, sexo, newUserId]
        );

        await connection.commit();
        connection.release();

        res.status(201).json({
            message: 'Paciente registrado exitosamente.',
            userId: newUserId
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error('Error haciendo rollback:', rollbackError);
            } finally {
               connection.release();
            }
        }
        res.status(500).json({ message: 'Error interno del servidor al registrar el paciente.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan email o contraseña.' });
    }

    try {
        const [users] = await pool.query(
            'SELECT idUsuario, MailUsuario, PasswordUsuario, RolUsuario, IsActive FROM usuarios WHERE MailUsuario = ? LIMIT 1',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const user = users[0];

        if (user.IsActive !== 1) {
             return res.status(403).json({ message: 'Usuario inactivo.' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.PasswordUsuario);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const payload = {
            userId: user.idUsuario,
            email: user.MailUsuario,
            role: user.RolUsuario
        };
        const secretKey = process.env.JWT_SECRET;
        const options = { expiresIn: '1h' };

        if (!secretKey) {
            console.error('Error: JWT_SECRET no está definida en el archivo .env');
            return res.status(500).json({ message: 'Error interno del servidor: Falta configuración de seguridad.' });
        }

        const token = jwt.sign(payload, secretKey, options);

        res.json({
            message: 'Login exitoso.',
            token: token,
            user: {
                id: user.idUsuario,
                email: user.MailUsuario,
                role: user.RolUsuario
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor durante el login.' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio.' });
    }

    try {
        const [users] = await pool.query(
            'SELECT idUsuario, MailUsuario FROM usuarios WHERE MailUsuario = ? AND IsActive = 1 LIMIT 1',
            [email]
        );

        if (users.length === 0) {
            console.log(`Solicitud de reseteo para email no encontrado o inactivo: ${email}`);
            return res.json({ message: 'Si tu email está registrado, recibirás un enlace para resetear tu contraseña.' });
        }

        const user = users[0];
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);

        await pool.query(
            'UPDATE usuarios SET resetToken = ?, resetTokenExpires = ? WHERE idUsuario = ?',
            [hashedToken, expireDate, user.idUsuario]
        );

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const subject = 'Recuperación de Contraseña - Tu App Clínica';
        const htmlContent = `
            <h1>Recuperación de Contraseña</h1>
            <p>Has solicitado resetear tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
            <a href="${resetUrl}">Resetear Contraseña</a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste esto, ignora este email.</p>
        `;
        const textContent = `Has solicitado resetear tu contraseña. Copia y pega este enlace en tu navegador: ${resetUrl} \nEste enlace expirará en 1 hora. Si no solicitaste esto, ignora este email.`;

        await sendEmail(user.MailUsuario, subject, htmlContent, textContent);

        res.json({ message: 'Si tu email está registrado, recibirás un enlace para resetear tu contraseña.' });

    } catch (error) {
        console.error('Error en forgotPassword:', error);
        res.json({ message: 'Si tu email está registrado, recibirás un enlace para resetear tu contraseña.' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Faltan datos (token o nueva contraseña).' });
    }

    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    try {
        const [users] = await pool.query(
            'SELECT idUsuario FROM usuarios WHERE resetToken = ? AND resetTokenExpires > NOW() LIMIT 1',
            [hashedToken]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Token inválido o expirado.' });
        }

        const user = users[0];
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        await pool.query(
            'UPDATE usuarios SET PasswordUsuario = ?, resetToken = NULL, resetTokenExpires = NULL WHERE idUsuario = ?',
            [hashedPassword, user.idUsuario]
        );

        res.json({ message: 'Contraseña actualizada exitosamente.' });

    } catch (error) {
        console.error('Error en resetPassword:', error);
        res.status(500).json({ message: 'Error interno del servidor al resetear la contraseña.' });
    }
};

export { register, login, forgotPassword, resetPassword };