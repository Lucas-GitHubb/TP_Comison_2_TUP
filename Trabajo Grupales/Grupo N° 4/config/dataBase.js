// src/config/dataBase.js
import mysql from 'mysql2/promise';
import 'dotenv/config'; 

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB || 3306,
    
});

module.exports = { pool };
