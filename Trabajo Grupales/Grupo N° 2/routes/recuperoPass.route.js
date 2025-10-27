import { Router } from "express";
import { iniciarRecuperoContraseña, resetPass } from "../controllers/recuperoPass.controller.js";

const route = Router()

route.post('/recuperar', iniciarRecuperoContraseña)
route.post('/reset', resetPass)

export default route;