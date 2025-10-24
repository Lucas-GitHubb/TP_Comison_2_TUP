// src/config/dataBase.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv/config'); 

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB || 3306,
    
});

module.exports = { pool };
