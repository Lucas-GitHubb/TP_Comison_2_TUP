const mysql2 = require("mysql2");

const migration = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true          // porque mandás varios CREATE TABLE en una sola query
});

// wrapper de promesas también
module.exports = migration.promise();