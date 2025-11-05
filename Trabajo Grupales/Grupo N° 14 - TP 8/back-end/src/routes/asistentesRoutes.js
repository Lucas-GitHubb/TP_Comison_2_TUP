import express from "express";
import {
  crearAsistente,
  obtenerAsistentes,
  obtenerAsistentePorId,
  eliminarAsistente
} from "../controllers/asistentesControllers.js";

const router = express.Router();

// Crear asistente
router.post("/", crearAsistente);

// Obtener todos los asistentes
router.get("/", obtenerAsistentes);

// Obtener un asistente por ID
router.get("/:id", obtenerAsistentePorId);

// Eliminar asistente
router.delete("/:id", eliminarAsistente);

export default router;
