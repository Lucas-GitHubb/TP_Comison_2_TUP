const mysql = require('mysql2');
const dotenv =require
require('dotenv').config();//traigo las variables de entorno desde el archivo .env


//Crea la conexión a la base de datos usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // corregido el nombre para que coincida con tu .env
  port: process.env.DB_PORT
});

//Conecta a la base de datos y maneja errores
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la Base de Datos:', err);
    return;
  }
  console.log('✅ DB conectada exitosamente');
});

module.exports = connection;//estoy habilitando la conexión para usarla en otros archivos