import { Router } from "express";
import * as ctrl from "../controllers/ventas.controller.js";
const r = Router();

r.get("/", ctrl.list);
r.get("/:id", ctrl.getById);
r.post("/", ctrl.createVenta); // crea venta + detalles (transacción)

export default r;
