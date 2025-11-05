import express from "express";

// Importar todas las rutas
import artistasRoutes from "./artistasRoutes.js";
import asistentesRoutes from "./asistentesRoutes.js";
import eventoArtistaRoutes from "./eventoArtistaRoutes.js";
import eventosRoutes from "./eventosRoutes.js";
import inscripcionesRoutes from "./inscripcionesRoutes.js";
import mailRoutes from "./mailRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";

const router = express.Router();

// Registrar cada grupo de rutas bajo un prefijo
router.use("/artistas", artistasRoutes);
router.use("/asistentes", asistentesRoutes);
router.use("/evento-artista", eventoArtistaRoutes);
router.use("/eventos", eventosRoutes);
router.use("/inscripciones", inscripcionesRoutes);
router.use("/mail", mailRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;
