import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import usuariosRoutes from "./routes/usuarios.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import metricasRoutes from "./routes/metricas.routes.js";
import { pool } from "./config/db.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "up" });
  } catch {
    res.status(500).json({ status: "error", db: "down" });
  }
});

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/metricas", metricasRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal error", detail: err?.message });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () =>
  console.log(`API listening on http://localhost:${port}`)
);
