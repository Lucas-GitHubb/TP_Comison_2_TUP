const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const enviarCorreo = require('../helpers/emailhelper'); // importa tu helper

const secretKey = process.env.JWT_SECRET || 'secreto123';

// Crear un usuario (admin o normal)
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, rol || 'usuario']
    );

    // 📩 Enviar correo de bienvenida
    const mensajeHTML = `
      <h2>¡Bienvenido, ${nombre}!</h2>
      <p>Tu cuenta ha sido creada correctamente en el Sistema de Pagos.</p>
      <p>Rol asignado: <strong>${rol || 'usuario'}</strong></p>
      <p>Ya podés iniciar sesión y empezar a usar el sistema 💪</p>
    `;
    enviarCorreo(email, '¡Bienvenido al Sistema de Pagos!', mensajeHTML);

    res.json({ message: 'Usuario creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0)
      return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = rows[0];

    // Verificar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida)
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Crear token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      secretKey,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
