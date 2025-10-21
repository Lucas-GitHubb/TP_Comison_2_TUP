require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conection } = require('./config/DB');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Bienvenido a GymCode (v2)'));

// Mount existing routes from project root if available
try {
  const routesSocios = require('../routes/socios.routes');
  const routesActivades = require('../routes/actividades.routes');
  const routesReservas = require('../routes/routes.reservas');
  app.use('/', routesSocios);
  app.use('/', routesActivades);
  app.use('/', routesReservas);
} catch (err) {
  // If routes can't be loaded yet, skip — teammates will integrate
  console.warn('Some routes were not mounted:', err.message);
}

// Database connect helper
function connectDb() {
  conection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa');
    }
  });
}

module.exports = { app, connectDb };
