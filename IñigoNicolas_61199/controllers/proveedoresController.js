const conection = require("./../config/db")

const getAllProveedores = (req, res) => {
    const consulta = `select * from proveedores where id_proveedor = true`

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "error al cargar productos" })

        return res.json(result)
    })
}

const getProveedor = (req, res) => {
    const { id } = req.params

    const consulta = `select * from proveedores where id_proveedor=?`

    conection.query(consulta, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al cargar proveedor" })

        if (result.length === 0) return res.status(404).json({ message: "proveedor no encontrado" })

        return res.json(result)
    })
}

const createProveedor = (req, res) => {
    const {
        nombre_proveedor,
        email_proveedor,
        telefono_proveedor,
        direccion_proveedor
    } = req.body

    const consulta = `insert into proveedores (nombre_proveedor,
        email_proveedor,
        telefono_proveedor,
        direccion_proveedor ) values (?,?,?,?)`

    conection.query(consulta, [nombre_proveedor,
        email_proveedor,
        telefono_proveedor,
        direccion_proveedor],
        (error, result) => {
            if (error) return res.status(500).json({ message: "error al crear proveedor" })

            return res.status(201).json({ message: "proveedor creado con exito" })
        }
    )
}

const updateProveedor=(req,res)=>{
    const {id}= req.params
    const {
        nombre_proveedor,
        email_proveedor,
        telefono_proveedor,
        direccion_proveedor
    } = req.body

    const consulta=`update proveedores set nombre_proveedor=?,
        email_proveedor=?,
        telefono_proveedor=?,
        direccion_proveedor=?
        where id_proveedor=?`

    conection.query(consulta,[nombre_proveedor,
        email_proveedor,
        telefono_proveedor,
        direccion_proveedor],
        (error,result)=>{
            if(error) return res.status(500).json({message:"error al actualizar proveedor"})

            if (result.affectedRows === 0) return res.status(404).json({ message: "proveedor no encontrado" })
        
            return res.status(200).json({message:"proveedor actualizado con exito"})
        }
    )
}

const deleteProveedor=(req,res)=>{
    const {id}=req.params

    const consulta=`update proveedores set estado_proveedor= false where id_proveedor=?`

    conection.query(consulta,[id],(error,result)=>{
        if(error) return res.status(500).json({message:"error eliminar proveedor"})

        if(result.affectedRows===0) return res.status(404).json({message:"proveedor no encontrado"})
         
        return res.status(200).json({message:"proveedor eliminado con exito"})
    })
}

module.exports={
    getProveedor,
    getAllProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor
}