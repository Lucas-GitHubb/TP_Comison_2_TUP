const express = require("express");
const {
  getAllStock,
  getOneStock,
  getStockMinimo,
} = require("../controllers/stockController");

const router = express.Router();

//Traer todo el stock
router.get("/",getAllStock)

//Traer un stock
router.get("/getOne/:id",getOneStock)

//Traer los stock minimos
router.get("/minimos",getStockMinimo)

module.exports = router
