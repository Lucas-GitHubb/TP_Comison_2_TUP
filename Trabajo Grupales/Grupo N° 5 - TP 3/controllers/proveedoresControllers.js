const conection = require("./../config/database")

const getAllProveedores = (req, res) => {
    const consulta = `select 
    id_proveedor,
    nombre_proveedor,
    email,
    pais,
    telefono,
    provincia,
    calle,
    codigo_postal 
    from proveedores where estado_proveedor=1`

    conection.query(consulta, (error, results) => {
        if (error) return res.status(500).json({ message: "error al traer todos los proveedores" })

        return res.status(201).json(results)
    })
}

const getProveedores = (req, res) => {
    console.log("Entre a get un proveedor");
    
    const { nombre_proveedor } = req.body

    const consulta = `select 
    nombre_proveedor,
    email,
    telefono,
    provincia,
    calle,
    codigo_postal 
    from proveedores where nombre_proveedor=? and estado_proveedor=1`

    conection.query(consulta, [nombre_proveedor], (error, result) => {
        if (error) return res.status(500).json({ message: "error al cargar el proveedor" })

        if (result.length === 0) return res.status(404).json({ message: "El proveedor no existe" })

        return res.status(201).json(result)
    })
}

const createProveedores = (req, res) => {
    const {
        nombre_proveedor,
        email,
        telefono,
        pais,
        provincia,
        calle,
        codigo_postal
    } = req.body

    const consulta = `INSERT INTO proveedores (
    nombre_proveedor, 
    email, 
    telefono, 
    pais, 
    provincia, 
    calle, 
    codigo_postal)
    VALUES (?,?,?,?,?,?,?);`

    conection.query(consulta, [nombre_proveedor, email, telefono, pais, provincia, calle, codigo_postal],
        (error, result) => {
            if (error) return res.status(500).json({ message: "error al crear el nuevo proveedor" })

            return res.status(200).json({ message: "proveedor creado con exito" })
        }
    )
}

const updateProveedores = (req, res) => {
    console.log("Entre a update proveedores");
    
    const { id } = req.params

    const {
        nombre_proveedor,
        email,
        telefono,
        pais,
        provincia,
        calle,
        codigo_postal
    } = req.body

    const consultaProveedor = `select * from proveedores where id_proveedor=? and estado_proveedor = 1`
    const consultaUpdate = `update proveedores set 
        nombre_proveedor=?,
        email=?,
        telefono=?,
        pais=?,
        provincia=?,
        calle=?,
        codigo_postal=?`

    conection.query(consultaProveedor, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al buscar el proveedor" })

        if (result.length === 0) return res.status(404).json({ message: "El proveedor no existe" })

        conection.query(consultaUpdate,
            [nombre_proveedor,
                email,
                telefono,
                pais,
                provincia,
                calle,
                codigo_postal],
            (error2, result2) => {
                if (error2) return res.status(500).json({ message: "error al actualizar el proveedor" })

                return res.status(200).json({ message: "proveedor actulizado con exito" })
            })
    })
}

const deleteProveedores=(req,res)=>{
    const {id}=req.params

    const consulta=`update proveedores set estado_proveedor=0 where id_proveedor=?`

    conection.query(consulta,[id],(error,result)=>{
        if(error) return res.status(500).json({message:"Error al eliminar el proveedor"})
        
        return res.status(201).json({message:"proveedor eliminado con exito"})
    })
}

module.exports = {
    getAllProveedores,
    getProveedores,
    createProveedores,
    updateProveedores,
    deleteProveedores
}