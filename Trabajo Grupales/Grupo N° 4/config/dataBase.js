// src/config/dataBase.js
import mysql from 'mysql2/promise';
import 'dotenv/config'; 

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

const pool = mysql.createPool(dbConfig);

// Función universal para ejecutar consultas
export const query = async (sql, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(sql, params);
        return results;
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};
