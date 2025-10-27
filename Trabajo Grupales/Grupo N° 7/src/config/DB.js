const mysql2 = require("mysql2")

const conection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

conection.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err);
    } else {
        console.log("✅ Conectado a la base de datos MySQL");
    }
});
module.exports= {conection}