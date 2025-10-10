import { Router } from "express";
import { getVentas, obtenerVentaPorId, crearVenta, borrarVenta } from "../tp_gestion_comercial/controllers/ventas.controller.js";

const router = Router();

router.get("/", getVentas);
router.get("/:id", obtenerVentaPorId);
router.post("/", crearVenta);
router.delete("/:id", borrarVenta);

export default router;
