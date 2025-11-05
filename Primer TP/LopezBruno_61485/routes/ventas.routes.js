const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventas.controller");

router.get("/", ventasController.getVentas);
router.post("/", ventasController.createVenta);

module.exports = router;
