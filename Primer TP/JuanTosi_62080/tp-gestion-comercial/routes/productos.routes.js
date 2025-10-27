import { Router } from "express";
import {
  getAllProductos,
  getOneProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  productosMasVendidos,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", getAllProductos);
router.get("/:id", getOneProducto);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);
router.get("/metricas/mas-vendidos", productosMasVendidos);

export default router;
