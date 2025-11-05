const util = require("util");
const connection = require('../config/bd'); 
const {comparePass} = require("../utils/hash.utils")
const jwt = require("jsonwebtoken")

const query = util.promisify(conection.query).bind(conection);

const login = async (req, res)=>{
    try {
     const {email, contra} = req.body
     if(!email, !contra){
        return res.status(400).json({ error: 'El email y/o contrasenia son incorrectas' });
     }
     const consultaArtista = "select idEmpleado, nombre, email, contra, from Empleados where email =?"
     const result = await query (consultaArtista,[email])
      if (result.length === 0) {
            return res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
        }

        const Artista = result[0];
        const passCheck =  comparePass(contra, Artista.contra);

        if (!passCheck) {
            return res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
        }

        const payload = {
            id: Artista.idArtista,
            rol: Artista.rol,
            nombre: Artista.nombre
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).json({ msg: "Logueado", token });
    } catch (error) {
        console.error("Error en loginEmp:", error);
        res.status(500).json({mensaje:"Server error",error})  
    }
}

module.exports={login}