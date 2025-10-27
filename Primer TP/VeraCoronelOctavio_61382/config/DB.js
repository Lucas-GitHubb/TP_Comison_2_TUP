// config/DB.js
const mysql = require('mysql2/promise'); // Usamos la versión con promesas
require('dotenv').config();

// Crear el Pool de Conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Límite de conexiones simultáneas
    queueLimit: 0
});

// Función de prueba para verificar la conexión al iniciar el servidor
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión a MySQL exitosa en el hilo:", connection.threadId);
        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error("Error al conectar a MySQL:", error.message);
        // Si hay error, el servidor no debería arrancar
        process.exit(1);
    }
};

module.exports = {
    pool,
    testConnection
};