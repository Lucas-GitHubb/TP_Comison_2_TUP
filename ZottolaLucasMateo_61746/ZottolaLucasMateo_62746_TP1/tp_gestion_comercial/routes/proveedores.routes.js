import { Router } from "express";
import { getProveedores, obtenerProveedorPorId, crearProveedor, actualizarProveedor, borrarProveedor } from "../tp_gestion_comercial/controllers/proveedores.controller.js";

const router = Router();

router.get("/", getProveedores);
router.get("/:id", obtenerProveedorPorId);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", borrarProveedor);

export default router;
