import { Router } from "express";
import * as ctrl from "../controllers/ventas.controller.js";
const r = Router();
r.get("/", ctrl.listar);
r.get("/:id", ctrl.obtener);
r.post("/", ctrl.crear);
r.delete("/:id", ctrl.eliminar);
export default r;
