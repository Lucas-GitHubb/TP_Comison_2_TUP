const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();


const connection = mysql2.createConnection ({
    host:"localhost",
    user:"root",
    password:"156405182l",
    database:"Empresa"
})

module.exports = {connection};