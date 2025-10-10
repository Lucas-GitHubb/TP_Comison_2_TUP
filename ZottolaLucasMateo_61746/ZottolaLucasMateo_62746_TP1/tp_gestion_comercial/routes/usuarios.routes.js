import { Router } from "express";
import { getUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, borrarUsuario } from "../tp_gestion_comercial/controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", borrarUsuario);

export default router;
