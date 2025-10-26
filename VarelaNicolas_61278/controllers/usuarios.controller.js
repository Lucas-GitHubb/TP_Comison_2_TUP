import pool from '../config/DB.js';

export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios'); 
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]); 

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, puesto, salario } = req.body;

    if (!nombre || !apellido || !email || !puesto) {
        return res.status(400).json({ message: 'Faltan campos obligatorios (nombre, apellido, email, puesto)' });
    }

    try {
        const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }

        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, puesto, salario) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, email, puesto, salario || null] 
        );
        res.status(201).json({ 
            message: 'Usuario creado exitosamente',
            id: result.insertId,
            ...req.body 
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, puesto, salario } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, puesto = ?, salario = ? WHERE id = ?',
            [nombre, apellido, email, puesto, salario || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
        }

        const [updatedUser] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        res.json({ message: 'Usuario actualizado', usuario: updatedUser[0] });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(409).json({ message: 'El email ya está en uso por otro usuario.' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' }); 
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
         if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ message: 'No se puede eliminar el usuario porque está referenciado en otras tablas (ej: ventas).' });
         }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};