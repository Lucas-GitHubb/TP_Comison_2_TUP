import db from '../config/db.js';

//Traer todos los proveedores

export const obtenerProveedores= async (req, res) => {
    try {
        const obtenerTodosLosProveedores= 'SELECT * FROM proveedores';
        db.query(obtenerTodosLosProveedores, (err, results) => {
            if (err) {
                console.error('Error al obtener los proveedores:', err);
                res.status(500).json({ error: 'Error al obtener los proveedores' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

//Crear Proveedores

export const CrearProveedor= async (req,res)=>{
    try {
        const {nombreProveedor, direccionProveedor, telefonoProveedor}= req.body;
        const nuevoProveedor= 'INSERT INTO proveedores (nombreProveedor, direccionProveedor, telefonoProveedor) VALUES (?,?,?)';
        db.query(nuevoProveedor, [nombreProveedor, direccionProveedor, telefonoProveedor], (err, results)=>{
            if (err) {
                console.error('Error al crear el proveedor:', err);
                res.status(500).json({ error: 'Error al crear el proveedor' });
                return;
            }
            res.status(201).json({ message: 'Proveedor creado exitosamente', IDinsertado: results.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

export const modificarProveedor= async (req,res)=>{
    try {
        const {idProveedor}= req.params;
        const {nombreProveedor, direccionProveedor, telefonoProveedor}= req.body;

        const actualizarProveedor= 'UPDATE proveedores SET nombreProveedor=?, direccionProveedor=?, telefonoProveedor=? WHERE idProveedor=?';
        db.query(actualizarProveedor, [nombreProveedor, direccionProveedor, telefonoProveedor, idProveedor], (err, results)=>{
            if (err) {
                console.error('Error al modificar el proveedor:', err);
                res.status(500).json({ error: 'Error al actualizar el proveedor' });
                return;
            }
            res.status(200).json({ message: 'Proveedor actualizado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

//borrado lógico

export const borrarProveedor= async (req,res)=>{
    try {
        const {idProveedor}= req.params;
        const borrarProveedor= 'UPDATE proveedores SET isActive = 0 WHERE idProveedor=?';
        db.query(borrarProveedor, [idProveedor], (error, results)=>{
            if (error) {
                console.error('Error al borrar el proveedor:', error);
                res.status(500).json({ error: 'Error al borrar el proveedor' });
                return;
            }
            res.status(200).json({ message: 'Proveedor borrado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

// Traer Proveedores Activos
export const obtenerProveedoresActivos= async (req, res) => {
    try {
        const proveedoresActivos= 'SELECT * FROM proveedores WHERE isActive = 1';    
        db.query(proveedoresActivos, (error, results) => {
            if (error) {
                console.error('Error al obtener los proveedores activos:', error);
                res.status(500).json({ error: 'Error al obtener los proveedores activos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}