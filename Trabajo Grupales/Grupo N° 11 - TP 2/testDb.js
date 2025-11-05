const { pool } = require('./config/dataBase.js'); 

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ Conectado a la base de datos MySQL");
        conn.release();
    } catch (error) {
        console.error("❌ Error de conexión MySQL", error);
    }
})();
