const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();


const connection = mysql2.createConnection ({
    host:"localhost",
    user:"root",
    password:"Emiliano99",
    database:"Empresa"
})

module.exports = {connection};