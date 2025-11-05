// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();// traigo las variables de entorno desde el archivo .env


// // Crea la conexion a la base de datos MySQL
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// // Conectar a la base de datos
// connection.connect((error) => {
//     if (error) {
//         console.error("Error de conexion a la base de datos: ", error);
//         return;
//     }
//     console.log("Conexion a la base de datos exitosa");
// });

// module.exports = {connection};// estoy habilitando que sea llamado desde otro archivo