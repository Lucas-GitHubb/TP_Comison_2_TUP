import db from '../config/db.js';

//Traer todos los productos

export const obtenerProductos= async (req, res) => {
    try {
        const obtenerTodosLosProductos= 'SELECT * FROM productos';
        db.query(obtenerTodosLosProductos, (err, results) => {
            if (err) {
                console.error('Error al obtener los productos:', err);
                res.status(500).json({ error: 'Error al obtener los productos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

//Crear Productos

export const CrearProducto= async (req,res)=>{
    try {
        const {nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor}= req.body;
        const nuevoProducto= 'INSERT INTO productos (nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor) VALUES (?,?,?,?,?,?,?)';
        db.query(nuevoProducto, [nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor], (err, results)=>{
            if (err) {
                console.error('Error al crear el producto:', err);
                res.status(500).json({ error: 'Error al crear el producto' });
                return;
            }
            res.status(201).json({ message: 'Producto creado exitosamente', IDinsertado: results.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

export const modificarProducto= async (req,res)=>{
    try {
        const {idProducto}= req.params;
        const {nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor}= req.body;

        const actualizarProducto= 'UPDATE productos SET nombreProducto=?, codigoProducto=?, precioCompraProducto=?, precioVentaProducto=?, stockProducto=?, descripcionProducto=? , idProveedor=? WHERE idProducto=?';
        db.query(actualizarProducto, [nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor, idProducto], (err, results)=>{
            if (err) {
                console.error('Error al modificar el producto:', err);
                res.status(500).json({ error: 'Error al actualizar el producto' });
                return;
            }
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

//borrado lógico

export const borrarProducto= async (req,res)=>{
    try {
        const {idProducto}= req.params;
        const borrarProducto= 'UPDATE productos SET isActive = 0 WHERE idProducto=?';
        db.query(borrarProducto, [idProducto], (error, results)=>{
            if (error) {
                console.error('Error al borrar el producto:', error);
                res.status(500).json({ error: 'Error al borrar el producto' });
                return;
            }
            res.status(200).json({ message: 'Producto borrado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }}

// Traer productos Activos
export const obtenerProductosActivos= async (req, res) => {
    try {
        const productosActivos= 'SELECT * FROM productos WHERE isActive = 1';    
        db.query(productosActivos, (error, results) => {
            if (error) {
                console.error('Error al obtener los productos activos:', error);
                res.status(500).json({ error: 'Error al obtener los productos activos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}