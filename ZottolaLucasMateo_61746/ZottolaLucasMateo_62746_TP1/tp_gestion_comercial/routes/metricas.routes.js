import { Router } from "express";
import { obtenerMetricas } from "../tp_gestion_comercial/controllers/metricas.controller.js";

const router = Router();

router.get("/", obtenerMetricas);

export default router;
