const mysql = require( 'mysql2' );
require ('dotenv').config();


const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
);

// verificacion de connection 
connection.connect((e)=>{
    if(e){
        console.error('Error de conexion a la base de datos', e);
        return;
    }   
    console.log('conectado con exito a la base de datos');
})

module.exports= connection;
