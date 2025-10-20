import { Router } from "express";
import { CrearUsuario, modificarUsuario} from "../controllers/usuario.controller.js";


const router = Router()









router.post("/registro", CrearUsuario)
router.put("/modificar/:idUsuario", modificarUsuario)

export default router;


