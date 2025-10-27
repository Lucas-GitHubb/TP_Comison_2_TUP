import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sociosRoutes from "./routes/socios.routes.js";
import deportesRoutes from "./routes/deportes.routes.js";
import membresiasRoutes from "./routes/membresias.routes.js";
import mailRoutes from "./routes/mail.routes.js";
import authRoutes from "./routes/auth.routes.js";
import loginRoutes from "./routes/login.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/socios", sociosRoutes);
app.use("/api/deportes", deportesRoutes);
app.use("/api/membresias", membresiasRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/login", loginRoutes);
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
