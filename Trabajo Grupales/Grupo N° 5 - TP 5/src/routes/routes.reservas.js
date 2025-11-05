const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middleware/auth");

const { getReservas, addReserva, deleteReserva } = require("../controllers/reservas.controller");

router.get("/", getReservas);
router.post("/", verificarToken, addReserva); 
router.delete("/:id", verificarToken, deleteReserva); 

module.exports = router;
