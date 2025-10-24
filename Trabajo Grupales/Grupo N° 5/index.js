require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conection = require("./config/database");
const helmet = require("helmet");


const rutasMovimientos = require("./routes/rutasMovimientos");
const rutasProductos = require("./routes/rutasProductos");
const rutasStock = require("./routes/rutasStock");
const RoutesProveedores = require("./routes/proveedoresRouter");
const RoutesMigration = require("./routes/migrationRouter");
const RoutesUsuarios = require("./routes/rutasUsuarios");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
app.use("/migration", RoutesMigration);
app.use("/proveedores", RoutesProveedores);
app.use("/movimientos", rutasMovimientos);
app.use("/productos", rutasProductos);
app.use("/stock", rutasStock);
app.use("/usuarios", RoutesUsuarios);

const PORT = process.env.PORT || 8000;

conection.connect((error) => {
  if (error) throw error;
  console.log("conectado a las base de datos");
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`conectado a puerto ${PORT}`);
});
