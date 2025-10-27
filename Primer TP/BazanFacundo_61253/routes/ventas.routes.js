const express = require("express")
const router = express.Router()
const {registrarVentaEmpleado}= require("../controllers/ventas.controllers")

router.post("/venta/crear", registrarVentaEmpleado)

module.exports= router