const mysql2 = require("mysql2")

const conection = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: 3307,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true  
})

module.exports = conection.promise();