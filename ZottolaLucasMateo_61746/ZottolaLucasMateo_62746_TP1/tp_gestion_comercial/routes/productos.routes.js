import { Router } from "express";
import { getProductos, obtenerProductoPorId, crearProducto, actualizarProducto, borrarProducto } from "../tp_gestion_comercial/controllers/productos.controller.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", borrarProducto);

export default router;
