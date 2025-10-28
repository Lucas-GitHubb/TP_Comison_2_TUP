// src/config/emailConfig.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Tu correo de Gmail
    pass: process.env.EMAIL_PASS      // Tu clave de aplicación
  }
});

module.exports = transporter;
