const express = require("express") // importo libreria express
const connection = require("./config/config") //importo la conexion a la base de datos

const routesSocios = require('./routes/socios.routes'); //importo las rutas de socios
const routesActividades = require('./routes/actividades.routes'); //importo las rutas de actividades
const routesReservas = require('./routes/reservas.routes'); //importo las rutas de reservas

const app = express() //Guardo la funcion de express en una variable


const PORT = 8000  //Guardo en variable el puerto que corre el localhost

app.use(express.json()) //transformo en json

app.use("/", routesSocios);//uso las rutas de socios
app.use("/", routesActividades);//uso las rutas de actividades
app.use("/", routesReservas);//uso las rutas de reservas

app.get("/", (req, res) => {        //Hago peticion get para corroborar mi conexion
    res.send("Bienvenido a mi api")
})

connection.connect((error) => { // realizo la conexion con la base de datos
    if (error) throw error
    console.log("Conectado a mi DB")
})

app.listen(PORT, () => {
    console.log("Escuchando el puerto " + PORT) //puerto de escucha
})