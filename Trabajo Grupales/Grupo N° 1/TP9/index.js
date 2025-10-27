// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Routers
const sociosRoutes = require("./routes/socios.routes");
const deportesRoutes = require("./routes/deportes.routes");
const asignacionesRoutes = require("./routes/asignaciones.routes");
const pagosRoutes = require("./routes/pagos.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/socios", sociosRoutes);
app.use("/api/deportes", deportesRoutes);
app.use("/api/asignaciones", asignacionesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/auth", authRoutes);

// Base
app.get("/", (req, res) => res.json({ msg: "API Club Deportivo OK" }));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
