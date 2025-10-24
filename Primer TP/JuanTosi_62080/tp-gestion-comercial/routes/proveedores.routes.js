import { Router } from "express";
import {
  getAllProveedores,
  getOneProveedor,
  createProveedor,
  updateProveedor,
  deleteProveedor
} from "../controllers/proveedores.controller.js";

const router = Router();

router.get("/", getAllProveedores);
router.get("/:id", getOneProveedor);
router.post("/", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);

export default router;
