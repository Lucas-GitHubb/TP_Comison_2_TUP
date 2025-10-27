const conection = require("./../config/db")

const getAllUsuarios = (req, res) => {

    const consulta = "select * from usuarios where estado_usuario = true"

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "Error al obtener los datos" })

        return res.status(400).json(result)
    })
}

const getUsuario = (req, res) => {
    const {id} = req.params

    const consulta = `select * from usuarios where id_usuario=?`

    conection.query(consulta, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "usuario no encontrado" })

        if (result.length === 0) return res.status(404).json({ message: "usuario no encontrado" })

        return res.status(400).json(result)
    })
}

const createUsuario = (req, res) => {
    const {
        nombre_usuario,
        apellido_usuario,
        dni_usuario,
        email_usuario,
        contraseña,
        rol_usuario
    } = req.body
    console.log(req.body)

    const consulta = `insert into usuarios 
    (nombre_usuario,apellido_usuario,dni_usuario,email_usuario,contraseña,rol_usuario)
    values (?,?,?,?,?,?)`

    conection.query(consulta,
        [nombre_usuario,
            apellido_usuario,
            dni_usuario,
            email_usuario,
            contraseña,
            rol_usuario
        ],
        (error, result) => {
            if (error) return res.status(500).json({ message: "error al crear usuario" })

            return res.status(201).json({ message: "usuario creado exitosamente" })
        }
    )
}

const updateUsuario = (req, res) => {
    const { id } = req.params

    const {
        nombre_usuario,
        apellido_usuario,
        dni_usuario,
        email_usuario,
        contraseña,
        rol_usuario
    } = req.body

    const consulta = `update usuarios set nombre_usuario=?,apellido_usuario=?,dni_usuario=?,email_usuario=?,contraseña=?,rol_usuario=?,
    where id_usuario=?`

    conection.query(consulta,
        [
            nombre_usuario,
            apellido_usuario,
            dni_usuario,
            email_usuario,
            contraseña,
            rol_usuario,
            id
        ],
        (error, result) => {
            if (error) return res.status(500).json({ message: "error al actualizar usuario" })

            if (result.affectedRows === 0) return res.status(404).json({ message: "usuario no encontrado" })

            return res.status(200).json({ message: "usuario actualizado con exito" })
        }
    )
}

const deleteUsuario=(req,res)=>{
    const {id} = req.params
    console.log(id)

    const consulta= `update usuarios set estado_usuario = false where id_usuario=?`

    conection.query(consulta,[id],(error,result)=>{
        if(error) return res.status(500).json({message:"Error al eliminar usuario"})

        if(result.affectedRows===0){
            return res.status(404).json({message:"usuario no encontrado"})
        }

        return res.status(200).json({message:"usuario eliminado exitosamente"})
    })
}

module.exports={
    getUsuario,
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}