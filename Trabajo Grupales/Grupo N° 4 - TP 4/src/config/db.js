// src/config/db.js
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

// intentamos primero en la raíz del grupo, y si no, en src/
const rootEnv = path.resolve(__dirname, '../../.env');
const srcEnv  = path.resolve(__dirname, '../.env');
const chosenEnv = fs.existsSync(rootEnv) ? rootEnv : (fs.existsSync(srcEnv) ? srcEnv : null);

if (chosenEnv) {
  require('dotenv').config({ path: chosenEnv });
  console.log('🔎 Usando .env:', chosenEnv);
} else {
  console.warn('⚠ No se encontró .env en:', rootEnv, 'ni en:', srcEnv);
}

console.log('🔑 ENV ->', {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS ? '*' : '(vacío)',
  DB_PORT: process.env.DB_PORT,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

async function connectDB() {
  await sequelize.authenticate();
  console.log('✅ MySQL conectado');
}

module.exports = { sequelize, connectDB };