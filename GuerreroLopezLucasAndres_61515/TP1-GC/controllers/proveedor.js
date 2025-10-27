const {connection} = require("../config/DB")

const getAllProveedores = (req,res) =>{

    const consulta = " select * from Proveedores;"

    connection.query(consulta, (err, result) => {

    if (err) {
      console.error("Error al obtener proveedores:", err);
      return res.status(500).send({ message: "Ocurrió un error al consultar los proveedores." });
    }

    res.status(200).json({
      message: "Proveedores obtenidos correctamente.",
      data: result
    });
  });

}

const getOneProovedor = (req,res) =>{

    const id = req.params.id

    const consulta = "select * from Producto where id_proveedor=? ";

    connection.query(consulta,[id],(err,result)=>{

        if (err) throw err

        if(result.length === 0) {
            res.status(404).send({message:"No existe el producto"})

        }
        else{

            res.json(result)
        }

    })
}


const deleteProveedor = (req,res) =>{

    const id = req.params.id

    const consulta = "Delete from Proovedor where id_proveedor=?";

    connection.query(consulta,[id], (err,result)=>{

        if (err) throw err

        else{
            
            res.status(200).send({message:"Proveedor eliminado correctamente"})
        }

    })

}

const updateProveedor = (req,res) =>{

    console .log("header: ", req.headers)
    console.log("body: " , req.body);

    const id = req.params.id
    const nombre_proveedor = req.body.nombre_proveedor
    const apellido_proveedor  = req.body.apellido_proveedor
    const email_proveedor = req.body.email_proveedor
    const contraseña_proveedor = req.body.contraseña_proveedor

    const consulta = "UPDATE Producto SET nombre_proveedor=? , apellido_proveedor=? , email_proveedor=? , contraseña_proveedor=? WHERE id_producto=? ";

    connection.query(consulta,[nombre_proveedor,apellido_proveedor,email_proveedor,contraseña_proveedor,id],(err,result)=>{
        if (err) {
            console.error("Error al actualizar proveedor:", err);
            return res.status(500).send({ message: "Ocurrió un error en el servidor." });
        }else{
            
          res.json(result)
        }

        

    });

}


const createProveedores = (req,res) =>{

    const id = req.params.id
    const nombre_proveedor = req.body.nombre_proveedor
    const apellido_proveedor  = req.body.apellido_proveedor
    const email_proveedor = req.body.email_proveedor
    const contraseña_proveedor = req.body.contraseña_proveedor

    const consulta = "INSERT INTO Proveedor (nombre_proveedor, apellido_proveedor , email_proveedor, contraseña_proveedor ) VALUES ( ?, ?, ?, ?);"

    connection.query(consulta,[nombre_proveedor, apellido_proveedor, email_proveedor, contraseña_proveedor],(err,result)=>{

        if (err) {
            console.error("Error al cargar el proveedor:", err);
            return res.status(500).send({ message: "Ocurrió un error en el servidor." });
        }else{
            res.json(result).send({ message: "Proveedor cargado correctamente." });

        }
    })
}



module.exports= {getAllProveedores,getOneProovedor,deleteProveedor,updateProveedor, createProveedores};