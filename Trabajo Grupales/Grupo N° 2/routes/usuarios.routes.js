import { Router } from "express";
import { crearUsuario, modificarUsuario, obtenerUsuarios, obtenerUsuarioPorId } from "../controllers/usuarios.controller.js";
const router = Router();

router.post("/registro", crearUsuario);
router.put("/modificar/:idUsuario", modificarUsuario);
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:idUsuario", obtenerUsuarioPorId);

export default router;
