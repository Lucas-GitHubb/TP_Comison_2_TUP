import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import medicosRoutes from "./routes/medicos.routes.js";
import categoriasMedicoRoutes from "./routes/categoriaMedico.routes.js";
import turnoRoutes from "./routes/turnos.routes.js";
import pacientesRoutes from './routes/pacientes.routes.js';
import observacionesRoutes from "./routes/observaciones.routes.js";

dotenv.config();

const app = express();

app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/api/categorias-medicos", categoriasMedicoRoutes);
app.use("/api/turnos", turnoRoutes);
app.use("/api/observaciones", observacionesRoutes);
app.use("/api/pacientes", pacientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});