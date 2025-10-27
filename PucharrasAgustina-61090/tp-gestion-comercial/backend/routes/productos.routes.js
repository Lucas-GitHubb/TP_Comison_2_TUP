import express from "express";
import {
  getAllProductos,
  getProductoById,
  searchProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller.js";

const router = express.Router();

router.get("/", getAllProductos);
router.get("/:id", getProductoById);
router.get("/fecha/:nombre", searchProductos);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;