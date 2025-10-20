import { Router } from "express";
import { CrearUsuario, modificarUsuario,} from "../controllers/usuario.controller.js";
import { obtenerUsuarioPorId, obtenerUsuarios } from "../controllers/usuarios.controller.js";


const router = Router()









router.post("/registro", CrearUsuario)
router.put("/modificar/:idUsuario", modificarUsuario)
router.get("/usuarios", obtenerUsuarios)
router.get("/usuarios/:idUsuario", obtenerUsuarioPorId)

export default router;


