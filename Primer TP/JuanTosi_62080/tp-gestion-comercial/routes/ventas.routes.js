import { Router } from "express";
import {
  getAllVentas,
  getOneVenta,
  createVenta,
  deleteVenta,
  getTotalVentas,
  getVentasPorVendedor,
  getVentasPorFecha
} from "../controllers/ventas.controller.js";

const router = Router();

// Base: /api/ventas
router.get("/", getAllVentas);
router.get("/:id", getOneVenta);
router.post("/", createVenta);
router.delete("/:id", deleteVenta);
router.get("/total/general", getTotalVentas);
router.get("/vendedor/:id", getVentasPorVendedor);
router.get("/por-fecha", getVentasPorFecha);

export default router;
