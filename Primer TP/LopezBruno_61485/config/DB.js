const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Crear la conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conexión a la base de datos establecida correctamente.");
  }
});

module.exports = connection;
