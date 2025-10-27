import { Router } from "express";
import {
    borradoLogicoCategoriaMedico,
    crearCategoriaMedico,
    modificarCategoriaMedico,
    obtenerCategoriaMedicoPorId,
    obtenerCategoriasMedico
} from "../controllers/categoriaMedico.controller.js";

const router = Router();

router.get('/', obtenerCategoriasMedico);
router.get('/:idCatMedico', obtenerCategoriaMedicoPorId);
router.post('/', crearCategoriaMedico);
router.put('/:idCatMedico', modificarCategoriaMedico);
router.delete('/:idCatMedico', borradoLogicoCategoriaMedico);

export default router;