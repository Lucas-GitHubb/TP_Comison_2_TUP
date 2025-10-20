import { Router } from "express";
import { CrearUsuario} from "../controllers/usuario.controller.js";

const router = Router()









router.post("/registro", CrearUsuario)

export default router;


