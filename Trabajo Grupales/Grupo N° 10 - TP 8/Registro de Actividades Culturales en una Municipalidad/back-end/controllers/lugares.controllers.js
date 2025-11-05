const connection = require('../config/bd');

//obtener todos los lugares
const getAllLugares = (req, res)=>{
    const consulta = "SELECT * FROM lugares where ACTIVO = true";

    connection.query(consulta, (err,results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    })
}

//obtener lugar por tipo
const getLugarPorTipo = (req,res)=>{
    const {tipo} = req.params;
    const consulta = "SELECT * FROM lugares WHERE tipo = ? and activo = true";

    connection.query(consulta, [tipo], (err,results)=>{
        if(err) return res.status(500).json({error: err.message});
        if(results.length === 0) return res.status(404).json({error: 'Lugar no encontrado'});
        res.json(results);
    })

}

//crear lugar
const crearLugar = (req,res)=>{
    const {nombre, tipo, direccion, capacidad_maxima, contacto_nombre, contacto_telefono, contacto_email} = req.body;

    const consulta = "INSERT INTO lugares (nombre, tipo, direccion, capacidad_maxima, contacto_nombre, contacto_telefono, contacto_email) values (?,?,?,?,?,?,?)";

    connection.query(consulta, [nombre, tipo, direccion, capacidad_maxima, contacto_nombre, contacto_telefono, contacto_email], (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({message: 'Lugar creado'});

    })
}

//editar lugar
const editLugar = (req,res)=>{
    const {id} = req.params;
    const {nombre, tipo, direccion, capacidad_maxima, contacto_nombre, contacto_telefono, contacto_email, equipamiento} = req.body;

    const consulta = "UPDATE lugares set nombre=?, tipo=?, direccion=?, capacidad_maxima=?, contacto_nombre=?, contacto_telefono=?, contacto_email=?, equipamiento=? where id=?";

    connection.query(consulta, [nombre, tipo, direccion, capacidad_maxima, contacto_nombre, contacto_telefono, contacto_email,equipamiento, id], (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json({message: 'Lugar actualizado'});
    })
    

}

//eliminar lugar baja logica
const deleteLugar = (req,res)=>{
    const {id} = req.params;
    const consulta = "UPDATE lugares set activo=false where id=?";

    connection.query(consulta,[id],(err,results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json({message: 'Lugar eliminado'});
    })
}

module.exports = {getAllLugares, getLugarPorTipo, crearLugar, editLugar, deleteLugar}