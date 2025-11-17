// app.js
import express from "express";
import cors from "cors";

// Importar las rutas
import clienteRoutes from "./src/routes/clienteRoutes.js";
import servicioRoutes from "./src/routes/servicioRoutes.js";
import turnoRoutes from "./src/routes/turnoRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, status: "API funcionando" });
});

// Rutas principales
app.use("/clientes", clienteRoutes);
app.use("/servicios", servicioRoutes);
app.use("/turnos", turnoRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor"
  });
});

export default app;
