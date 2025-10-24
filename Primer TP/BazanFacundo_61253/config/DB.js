const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();


const connection = mysql2.createConnection ({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB
})

module.exports = {connection};