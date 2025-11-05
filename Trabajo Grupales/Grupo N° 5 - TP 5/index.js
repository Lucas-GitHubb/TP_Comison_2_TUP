require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conection } = require("./config/DB"); 

const app = express();

app.use(cors());
app.use(express.json());

const rutasActividades = require("./routes/actividades.routes");
const rutasReservas = require("./routes/routes.reservas");
const rutasSocios = require("./routes/socios.routes");
const rutasAuth = require("./routes/authRoutes");
app.use("/api/actividades", rutasActividades);
app.use("/api/reservas", rutasReservas);
app.use("/api/socios", rutasSocios);
app.use("/api/auth", rutasAuth);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
