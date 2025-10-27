import express from "express";
import { obtenerInscripciones, crearInscripcion } from "../controllers/inscripcionesController.js";

const router = express.Router();

router.get('/', obtenerInscripciones);
router.post('/', crearInscripcion);

export default router;
