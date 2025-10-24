import { Router } from "express";
import {
  getResumenVentas,
  getProductosBajoStock,
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenProveedoresYPrecios
} from "../controllers/metricas.controller.js";

const router = Router();

// Endpoints base: /api/metricas
router.get("/resumen-ventas", getResumenVentas);
router.get("/productos-bajo-stock", getProductosBajoStock);
router.get("/ventas-por-mes", getVentasPorMes);
router.get("/productos-mas-vendidos", getProductosMasVendidos);
router.get("/resumen-proveedores-precios", getResumenProveedoresYPrecios);

export default router;
