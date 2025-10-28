const mysql = require('mysql2/promise');
require('dotenv').config();

// DEBUG: imprimir variables de entorno para verificar que Node las lea
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '********' : '(vacío)');
console.log('DB_DATABASE:', process.env.DB_DATABASE);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
