const express = require('express');
const { getAllLugares, getLugarPorTipo, crearLugar, editLugar, deleteLugar } = require('../controllers/lugares.controllers');
const router = express.Router();


router.get("/", getAllLugares);
router.get("/:tipo", getLugarPorTipo);

router.post("/", crearLugar)

router.put("/:id", editLugar)
router.put("/eliminar/:id", deleteLugar)

module.exports = router;