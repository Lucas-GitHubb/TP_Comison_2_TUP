import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/usuarios.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import metricasRoutes from "./routes/metricas.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Rutas de las apis 

app.use("/api/usuarios", usuariosRoutes);

app.use("/api/proveedores", proveedoresRoutes);

app.use("/api/productos", productosRoutes);

app.use("/api/ventas", ventasRoutes);

app.use("/api/metricas", metricasRoutes);

// conexión con el servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));
