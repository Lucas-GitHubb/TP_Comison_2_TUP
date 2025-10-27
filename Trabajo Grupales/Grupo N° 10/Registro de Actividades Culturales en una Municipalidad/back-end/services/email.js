const nodemailer = require("nodemailer")
const dotenv = require ("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587 || 465,
    secure:false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const enviarReuperacionPassword = async (email,link) =>{
    const htmlTemplate = `<div>
    <h2>Recuperacion contrasenia</h2>
    <p>hemos recibido una solicitud para restablecer tu contrasenia. haz clic en el siguiente enlace</p>
    <a> href="${link}"</a>
    </div>`

    return transporter.sendMail({
        from: `Soporte <${process.env.SMTP_USER}>`, 
        to: email,
        subject: "Recuperacion contrasenia",
        html: htmlTemplate
    })
}

module.exports(enviarReuperacionPassword)

