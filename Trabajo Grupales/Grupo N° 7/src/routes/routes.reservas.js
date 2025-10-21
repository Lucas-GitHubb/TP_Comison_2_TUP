
const express = require("express")
const router = express.Router()
const reservasController = require("../controllers/reservas.controller")

router.get("/", reservasController.getReservas)
router.post("/", reservasController.addReserva)
router.delete("/:id", reservasController.deleteReserva)

module.exports = router
