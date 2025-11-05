import dotenv from 'dotenv';
import app from './src/app.js';
import db from './src/config/db.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

// Probar la conexión al arrancar
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Conexión a la base de datos exitosa.");
    connection.release();
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
};

testConnection();


app.get("/", (req, res) => {
    res.send("Conexion funcionando correctamente.");
});



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
