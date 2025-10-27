const { conection } = require("../config/DB");
const bcrypt = require("bcryptjs"); 

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { enviarCorreo } = require('../config/mailer');

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


const createSocio = async (req, res) => {
    const { nombreSocio, apellidoSocio, emailSocio, contraSocio } = req.body;

    try {
        let salt = await bcrypt.genSalt(10);
        let contraEncrip = await bcrypt.hash(contraSocio, salt);

        const consulta = "INSERT INTO socios (nombreSocio, apellidoSocio, emailSocio, contraSocio) VALUES (?,?,?,?)";
        
        conection.query(consulta, [nombreSocio, apellidoSocio, emailSocio, contraEncrip], (err, result) => {
            if (err) {
                console.log("Error al crear Socio", err);
                return res.status(500).json({ error: "Error al crear Socio" });
            }
            res.status(201).json({ message: "Socio creado con exito" });
        });
    } catch (error) {
        console.log("Error interno al crear socio", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


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


 


const loginSocio = (req, res) => {
  const { email, password } = req.body;

  console.log("Login request body:", req.body); 

  const sql = "SELECT * FROM socios WHERE emailSocio = ?";
  conection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err); 
      return res.status(500).json({ error: "Error en el servidor" });
    }

    console.log("Resultados de la query:", results); 

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];

   
    const passwordValida = await bcrypt.compare(password, usuario.contraSocio);

    if (!passwordValida) {
      console.log("Contraseña incorrecta para usuario:", usuario.emailSocio);
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    
    const token = jwt.sign({ id: usuario.idSocio, email: usuario.emailSocio }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login exitoso, token generado para:", usuario.emailSocio); 

    res.json({ token });
  });
};


const recuperarPassword = (req, res) => {
    const { emailSocio } = req.body;
    const consulta = "SELECT * FROM socios WHERE emailSocio = ?";

    conection.query(consulta, [emailSocio], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al buscar usuario" });
        if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const socio = results[0];
        const link = `http://localhost:3000/reset/${socio.idSocio}-${Date.now()}`; 

        enviarCorreo(emailSocio, socio.nombreSocio, link, (err, info) => {
            if (err) return res.status(500).json({ error: "Error al enviar correo" });
            res.json({ message: "Correo de recuperación enviado correctamente" });
        });
    });
}


module.exports ={
    getSocios,
    getSocio,
    createSocio,
    updateSocio,
    darBajaSocio,
    reactivarSocio,
    loginSocio,
    recuperarPassword
} 