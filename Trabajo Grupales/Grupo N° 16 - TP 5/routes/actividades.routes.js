const express = require("express");

const { mostrarActividades, crearActividad, editarActividad, eliminarActividad } = require("../controllers/actividades.controller");

const router = express.Router();

router.get("/actividades", mostrarActividades);
router.post("/actividades/crearActividad", crearActividad);
router.put("/actividades/editarActividad/:id", editarActividad);
router.delete("/actividades/eliminarActividad/:id", eliminarActividad);

module.exports = router;