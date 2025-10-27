import express from "express";
import {
  getAllCompras,
  getCompraById,
  searchComprasByProveedor,
  createCompra,
  updateCompra,
  deleteCompra
} from "../controllers/compras_proveedor.controller.js";

const router = express.Router();

router.get("/", getAllCompras);
router.get("/:id", getCompraById);
router.get("/fecha/:proveedor", searchComprasByProveedor);
router.post("/", createCompra);
router.put("/:id", updateCompra);
router.delete("/:id", deleteCompra);

export default router;