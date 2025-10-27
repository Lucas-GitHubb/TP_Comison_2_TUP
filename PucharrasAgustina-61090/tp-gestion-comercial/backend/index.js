import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import productosRoutes from "./routes/productos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import metricasRoutes from "./routes/metricas.routes.js";
import comprasRoutes from "./routes/compras_proveedor.routes.js";

dotenv.config();

db.connect((err) => {
  if (err) {
    console.error("Error de conexion a la base de datos: ", err);
    return;
  }
  console.log("Conexion a la DB exitosa");
});

const app = express();
app.use(cors());

// configuracion del puerto
const PORT = process.env.PORT || 3000;

app.use(express.json());


// rutas
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/metricas", metricasRoutes);
app.use("/api/compras", comprasRoutes);


// prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando" });
});

// inicializo el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});