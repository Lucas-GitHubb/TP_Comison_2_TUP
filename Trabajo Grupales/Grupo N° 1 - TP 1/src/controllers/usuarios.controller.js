const db = require('../config/database'); 
const bcrypt = require('bcrypt'); //  hashear contraseñas


exports.obtenerTodosUsuarios = (req, res) => {
    // Usa callback de DB.query
    db.query('SELECT id, nombre, email, created_at FROM usuarios WHERE activo = true', (error, usuarios) => {
        if (error) {
            console.error('Error al obtener usuarios:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al obtener usuarios.' });
        }
        res.status(200).json(usuarios);
    });
};


exports.obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    
    // Usa callback de DB.query
    db.query('SELECT id, nombre, email, created_at FROM usuarios WHERE id = ? AND activo = true', [id], (error, usuario) => {
        if (error) {
            console.error('Error al obtener usuario por ID:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor.' });
        }

        if (usuario.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado o inactivo.' });
        }

        res.status(200).json(usuario[0]);
    });
};

// 3. CREAR UN NUEVO USUARIO (Con hasheo de callbacks)
exports.crearUsuario = (req, res) => { 
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios: nombre, email y password.' });
    }

    // 🛡️ PASO 1: Hashear la contraseña usando el patrón de CALLBACK de bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error durante el hasheo:', err);
            return res.status(500).json({ mensaje: 'Error interno del servidor al hashear la contraseña.' });
        }

        
        db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword], 
            (error, resultado) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ mensaje: 'El email ya está registrado.' });
                    }
                    console.error('Error al crear usuario:', error);
                    return res.status(500).json({ mensaje: 'Error interno del servidor al crear usuario.' });
                }

                res.status(201).json({ 
                    mensaje: 'Usuario creado exitosamente.', 
                    id: resultado.insertId 
                });
            }
        );
    });
};


exports.actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body; 

    if (!nombre && !email) {
        return res.status(400).json({ mensaje: 'Debe proporcionar al menos un campo para actualizar (nombre o email).' });
    }

    let updateFields = [];
    let values = [];
    if (nombre) { updateFields.push('nombre = ?'); values.push(nombre); }
    if (email) { updateFields.push('email = ?'); values.push(email); }
    values.push(id);
    
    
    db.query(
        `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ? AND activo = true`, 
        values,
        (error, resultado) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ mensaje: 'El nuevo email ya está en uso por otro usuario.' });
                }
                console.error('Error al actualizar usuario:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar usuario.' });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado o inactivo para actualizar.' });
            }

            res.status(200).json({ mensaje: 'Usuario actualizado exitosamente.' });
        }
    );
};

exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;

    
    db.query(
        'UPDATE usuarios SET activo = false WHERE id = ? AND activo = true', 
        [id],
        (error, resultado) => {
            if (error) {
                console.error('Error al eliminar (baja lógica) usuario:', error);
                return res.status(500).json({ mensaje: 'Error interno del servidor al desactivar usuario.' });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado o ya estaba inactivo.' });
            }

            res.status(200).json({ mensaje: 'Usuario desactivado (baja lógica) exitosamente.' });
        }
    );
};