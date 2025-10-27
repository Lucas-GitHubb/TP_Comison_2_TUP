import { Router } from "express";
import * as ctrl from "../controllers/metricas.controller.js";
const r = Router();
r.get("/total-ventas", ctrl.totalVentas);
r.get("/productos-mas-vendidos", ctrl.productosMasVendidos);
r.get("/stock-bajo", ctrl.stockBajo);
export default r;