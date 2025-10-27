import express from "express";
import {
  crearArtistas,
  obtenerArtistas
} from "../controllers/artistasControllers.js";

const router = express.Router();

// Crear artista
router.post("/", crearArtistas);

// Obtener todos los artistas
router.get("/", obtenerArtistas);

export default router;
