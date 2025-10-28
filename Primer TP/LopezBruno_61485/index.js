const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require("./routes/usuarios.routes");
const proveedoresRoutes = require("./routes/provedores.routes");
const productosRoutes = require("./routes/productos.routes");
const ventasRoutes = require("./routes/ventas.routes");
const metricasRoutes = require("./routes/metricas.routes");

// Usar rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/provedores", proveedoresRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/metricas", metricasRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
