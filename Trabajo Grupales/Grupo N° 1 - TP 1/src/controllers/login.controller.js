const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUsuario = (req, res) => {
    const { email, password } = req.body;

    
    const query = 'SELECT * FROM usuarios WHERE email = ? AND activo = ?';

    db.query(query, [email, 1], async (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            // Asegúrate de que el error no sea por la falta del campo 'activo' si usas mysql2 en modo callback.
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const usuario = results[0];
            
            // 🚨 CORRECCIÓN 1: El campo de la contraseña en la BD es 'password', no 'pass'
            const passwordValido = await bcrypt.compare(password, usuario.password);
            
            if (passwordValido) {
                const token = jwt.sign(
                    { 
                        // 🚨 CORRECCIÓN 2: El campo de ID en la BD es 'id', no 'id_usuario'
                        id: usuario.id, 
                        email: usuario.email,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                ); 
                return res.json({ 
                    message: 'Inicio de sesión exitoso', 
                    token: token 
                });
            } else {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }  
    });
};

module.exports = { loginUsuario };