const { conection } = require("../config/DB");
const brcyptjs = require("bcryptjs")

const getSocios = (req, res)=>{
    const consulta = "select * from socios"

    conection.query(consulta,(err,result)=>{
        if(err){
            console.log("Error al tratar de traer los socios", err)
            return res.status(500).json({error:"Error al traer los socios"});
        }
        res.status(200).json({message:"Socios traidos con exito", result})
    })
}

const getSocio = (req, res) =>{
    const id = req.params.id
    const consulta = "select * from socios where idSocio = ?"

    conection.query(consulta,[id],(error,result)=>{
        if (error) {
      console.log("Error al traer el socio:", error);
      return res.status(500).json({ error: "Error al traer al el socio" });
    }
    res.status(200).json({ message: "Socio traido con exito", result });
    })
}

const createSocio = async (req, res)=>{
    const {nombreSocio, apellidoSocio, emailSocio, contraSocio} = req.body;

    let salt = await brcyptjs.genSalt(10);
    let contraEncrip = await brcyptjs.hash(contraSocio, salt);

    const consulta = "insert into socios (nombreSocio, apellidoSocio, emailSocio, contraSocio) values (?,?,?,?)";
    
    conection.query(consulta,[nombreSocio, apellidoSocio, emailSocio, contraEncrip],(err, result)=>{
        if(err){
            console.log("Error al crear Socio",err)
            return res.status(500).json({error:"Error al crear Socio"})
        }
        res.status(201).json({message:"Socio creado con exito"})
    })
}

const updateSocio = async (req,res) =>{
    const id = req.params.id
    const {nombreSocio, apellidoSocio, emailSocio, contraSocio} = req.body;
    
    let salt = await brcyptjs.genSalt(10);
    let contraEncrip = await brcyptjs.hash(contraSocio, salt);

    const consulta = "update socios set nombreSocio=?, apellidoSocio=?, emailSocio=?, contraSocio=? where idSocio =?"

    conection.query(consulta, [nombreSocio, apellidoSocio, emailSocio, contraEncrip, id], (err,result)=>{
        if(err){
            console.log("Error al actualizar el socio",err)
           return res.status(500).json({error:"Error al actulizar el socio"})
        }
        res.status(201).json({message:"Socio actualizado con exito"})
    })
}

const darBajaSocio = (req, res)=>{
    const id = req.params.id;
    const consulta = "update socios set activo = false where idSocio=?";

    conection.query(consulta,[id], (err,result)=>{
        if(err){
            console.log("Error al dar de baja al socio", err)
            return res.status(500).json({error:"Error al dar de baja al socio"})
        }
        res.status(201).json({message:"Socio dado de baja con exito"})
    })
}


const reactivarSocio = (req, res)=>{
    const id = req.params.id;
    const consulta = "update socios set activo = true where idSocio=?";

    conection.query(consulta,[id], (err,result)=>{
        if(err){
            console.log("Error al reactivar al socio", err)
            return res.status(500).json({error:"Error al reactivar al socio"})
        }
        res.status(201).json({message:"Socio reactivado con exito"})
    })
}

module.exports ={
    getSocios,
    getSocio,
    createSocio,
    updateSocio,
    darBajaSocio,
    reactivarSocio
} 