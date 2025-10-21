import mysql2 from 'mysql2/promise'

const poolMigration = mysql2.createPool({
    host: 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

export default poolMigration;