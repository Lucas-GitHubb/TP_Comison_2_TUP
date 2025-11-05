const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Opcional: para logging de solicitudes
const routes = require('./routes/index'); // importa las rutas desde el archivo index.js en la carpeta routes

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(morgan('dev')); // registra las solicitudes hattp en la consola
app.use(express.json()); // analisa el JSON cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // analiza cuerpos de solicitudes con URL codificada

// Usa las rutas importadas
app.use('/api', routes);// monta las rutas importadas en el prefijo /api
///appi.clientes ,/api.proveedores ,/api.productos ,/api.ventas ,/api.metricas  

//rutas
app.get("/", (req, res) => {
  res.send("Bienvenido al Sistema de Gestión Comercial");
});
module.exports = app;