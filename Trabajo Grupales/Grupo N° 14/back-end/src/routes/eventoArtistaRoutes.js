import express from "express";
import { asociarArtistaAEvento } from "../controllers/eventoArtistaController.js";

const router = express.Router();

// Endpoint para asociar artista con evento
router.post("/", asociarArtistaAEvento);

export default router;
