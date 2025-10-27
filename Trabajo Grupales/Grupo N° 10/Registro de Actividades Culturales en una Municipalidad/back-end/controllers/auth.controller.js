const jwt = require("jsonwebtoken");
const {enviarRecuperacionPassword} = require("../services/email");
const {connection} = require("../config/bd")
const dotenv= require("dotenv")

dotenv.config();

const solicitarReset = (req,res)=>{
    const {email} = req.body;
    const query= "SELECT * FROM Usuarios WHERE mail = ?";

    connection.query(query,[email],async (error , results)=>{

        if(error){
            return res.status(500).json({message:"Error en el servidor"})
        }

        if(results.lenght === 0){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        const user = results[0];
        const token =jwt.sign({id:user.id_usuario, mail:user.mail},process.env.JWT_SECRET,{expiresIn: "15m"});
        const link = `http://localhost:3000/api/auth/reset-password?token=${token}`;
        await enviarRecuperacionPassword(user.mail,link);
        return res.status(200).json({mesagge: "Email de recuperacion enviado"});


    })
}

const resetPassword = (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const query = "UPDATE Usuarios SET password = ? WHERE id_usuario = ?";
    connection.query(query, [hashedPassword, decoded.id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Contraseña actualizada correctamente" });
    });
};



module.exports ={solicitarReset,resetPassword}