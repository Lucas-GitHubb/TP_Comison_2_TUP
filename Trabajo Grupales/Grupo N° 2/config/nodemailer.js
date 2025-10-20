import nodemailer from 'nodemailer';

//creamos el servicio para poder utilizar el email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "martincardozo1993xp@gmail.com",
    pass: "radt cwvs dzxs tead"
  }
});

export default transporter;