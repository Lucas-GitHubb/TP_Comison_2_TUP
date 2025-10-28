import { Router } from "express";
import * as ctrl from "../controllers/metricas.controller.js";
const r = Router();

r.get("/ventas/diarias", ctrl.ventasDiarias);       // ?from=YYYY-MM-DD&to=YYYY-MM-DD
r.get("/ventas/resumen", ctrl.resumenVentas);       // totales
r.get("/top-productos", ctrl.topProductos);         // ?limit=5
r.get("/stock/valor", ctrl.valorStock);             // valuación total

export default r;
