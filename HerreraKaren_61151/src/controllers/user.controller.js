import db from '../config/db.js';

//Traer todos los usuarios

export const obtenerUsuarios= async (req, res) => {
    try {
        const obtenerTodosLosUsuarios= 'SELECT * FROM usuarios';
        db.query(obtenerTodosLosUsuarios, (err, results) => {
            if (err) {
                console.error('Error al obtener los usuarios:', err);
                res.status(500).json({ error: 'Error al obtener los usuarios' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

//Crear Usuarios

export const CrearUsuario= async (req,res)=>{
    try {
        const {nombreUsuario, apellidoUsuario,direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario}= req.body;
        const nuevoUsuario= 'INSERT INTO usuarios (nombreUsuario, apellidoUsuario,direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario) VALUES (?,?,?,?,?,?)';
        db.query(nuevoUsuario, [nombreUsuario, apellidoUsuario,direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario], (err, results)=>{
            if (err) {
                console.error('Error al crear el usuario:', err);
                res.status(500).json({ error: 'Error al crear el usuario' });
                return;
            }
            res.status(201).json({ message: 'Usuario creado exitosamente', IDinsertado: results.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

export const modificarUsuario= async (req,res)=>{
    try {
        const {idUsuario}= req.params;
        const {nombreUsuario, apellidoUsuario,direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario}= req.body;

        const actualizarUsuario= 'UPDATE usuarios SET nombreUsuario=?, apellidoUsuario=?, direccionUsuario=?, telefonoUsuario=?, emailUsuario=?, contrasenaUsuario=? WHERE idUsuario=?';
        db.query(actualizarUsuario, [nombreUsuario, apellidoUsuario,direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario, idUsuario], (err, results)=>{
            if (err) {
                console.error('Error al modificar el usuario:', err);
                res.status(500).json({ error: 'Error al actualizar el usuario' });
                return;
            }
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

//borrado lógico

export const borrarUsuario= async (req,res)=>{
    try {
        const {idUsuario}= req.params;
        const borrarUsuario= 'UPDATE usuarios SET isActive = 0 WHERE idUsuario=?';
        db.query(borrarUsuario, [idUsuario], (error, results)=>{
            if (error) {
                console.error('Error al borrar el usuario:', error);  
                res.status(500).json({ error: 'Error al borrar el usuario' });
                return;
            }
            res.status(200).json({ message: 'Usuario borrado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

// Traer Usuarios Activos
export const obtenerUsuariosActivos= async (req, res) => {
    try {
        const usuariosActivos= 'SELECT * FROM usuarios WHERE isActive = 1';    
        db.query(usuariosActivos, (error, results) => {
            if (error) {
                console.error('Error al obtener los usuarios activos:', error);
                res.status(500).json({ error: 'Error al obtener los usuarios activos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}