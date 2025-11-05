import express from "express";
import {
  crearEvento,
  obtenerEventos,
} from "../controllers/eventoControllers.js";

const router = express.Router();

// Crear evento
router.post("/", crearEvento);

// Obtener todos los eventos
router.get("/", obtenerEventos);


export default router;
