const express = require("express");

const {
  getAllStock,
  getOneStock,
  getStockMinimo,
} = require("../controllers/stockController");

const router = express.Router();

//Traer todos los stock
router.get("/", getAllStock);

//Traer un solo stock
router.get("/:id", getOneStock);

//Traer el stock minimo
router.get("/minimos", getStockMinimo);

module.exports = router
