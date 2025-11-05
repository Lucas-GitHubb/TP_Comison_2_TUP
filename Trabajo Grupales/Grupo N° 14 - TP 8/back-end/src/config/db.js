import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // cargar variables del .env

// Crear el pool de conexiones
const db = mysql.createPool({
  host: process.env.DB_HOST,    
  user: process.env.DB_USER,    
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Opcional: probar la conexión al arrancar
(async () => {
  try {
    const connection = await db.getConnection(); // pide una conexión del pool
    console.log("Se ha creado la conexión exitósamente.");
    connection.release(); // liberar la conexión al pool
  } catch (err) {
    console.error("Error conectando a MySQL:", err);
  }
})();

export default db;
