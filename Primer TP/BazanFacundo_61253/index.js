require("dotenv").config()
const express = require("express");

const { conection } = require("./config/DB");

const routesProductos = require("./routes/productos.routes")
const routesProvedores = require("./routes/provedores.routes")
const routesUsuarios= require("./routes/usuarios.routes")
const routesVentas = require("./routes/ventas.routes")

const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido");
});

app.use("/", routesProductos);
app.use("/", routesProvedores)
app.use("/",routesUsuarios)
app.use("/",routesVentas)

conection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error al iniciar el servidor:", err);
  } else {
    console.log("Servidor corriendo en el puerto " + PORT);
  }
});