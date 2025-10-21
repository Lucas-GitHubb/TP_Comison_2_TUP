require("dotenv").config()
const express = require('express');
const { conection } = require('./src/config/database');
const routesSocios = require("./routes/socios.routes")
const routesActivades = require("./routes/actividades.routes")
const routesReservas = require("./routes/routes.reservas")
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());


// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a GymCode');
});
app.use("/",routesSocios)
app.use("/",routesActivades)
app.use("/",routesReservas)

// Conexión a la base de datos
conection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});


// Puerto del servidor
const PORT = process.env.PORT;

app.listen(PORT,(err) =>{
    if (err) {
        console.error('Error al iniciar el servidor:', err);
    } else {
        console.log('Servidor corriendo en el puerto ' + PORT);
    }
});