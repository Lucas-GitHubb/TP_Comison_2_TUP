const {conection} = require ("../config/DB")

const getActividades = (req, res) => {
    const consulta = "select * from actividades"

    conection.query(consulta, (err, result) => {
        if(err) throw err
        res.json(result)
    })
}

const CreateAtividades = (req, res) => {
    const consulta = "insert into actividades (nombre, cupo_maximo) values (?,?)"

    conection.query(consulta, [nombre, cupo_maximo],(err, result)=> {
        if(err) throw err
        res.json({message: "Actividad creada con exito"})
    })
}

const updateActividades = (req, res) => {
    const {id} = req.params;
    const {nombre, cupo_maximo} = req.body;
    const consulta = "update actividades set nombre = ?, cupo_maximo = ? where id = ?"

    conection.query(consulta, [nombre, cupo_maximo, id], (err, result) =>{
        if(err) throw err
        res.json({message: "Actividad actualizada con exito"})
    })
}

const deleteActividades = (req, res) => {
    const {id} = req.params
    const consulta = "delete from actividades where id = ?"

    conection,query(consulta, [id], (err, result)=>{
        if(err) throw err
        res.json({message: "Actividad borrada con exito"})
    })
}

module.exports = {getActividades, CreateAtividades, updateActividades, deleteActividades}



