import express from "express";
import {
  getAllMetrics,
  getMetricaByDate,
  createMetrica,
  updateMetrica,
  deleteMetrica
} from "../controllers/metricas.controller.js";

const router = express.Router();

router.get("/", getAllMetrics);
router.get("/:fecha", getMetricaByDate);
router.post("/", createMetrica);
router.put("/:id", updateMetrica);
router.delete("/:id", deleteMetrica);

export default router;