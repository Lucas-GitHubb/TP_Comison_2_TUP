import { Router } from "express";
import * as ctrl from "../controllers/usuarios.controller.js";
const r = Router();

r.get("/", ctrl.listar);
r.get("/:id", ctrl.obtener);
r.post("/", ctrl.crear);
r.put("/:id", ctrl.actualizar);
r.delete("/:id", ctrl.eliminar);

export default r;