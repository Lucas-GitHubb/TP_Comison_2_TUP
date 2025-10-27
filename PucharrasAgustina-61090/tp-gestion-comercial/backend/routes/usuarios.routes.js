import express from "express";
import {
  getAllUsuarios,
  getUsuarioById,
  searchUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../controllers/usuarios.controller.js";

const router = express.Router();

router.get("/", getAllUsuarios);
router.get("/:id", getUsuarioById);
router.get("/search/:nombre", searchUsuarios);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;