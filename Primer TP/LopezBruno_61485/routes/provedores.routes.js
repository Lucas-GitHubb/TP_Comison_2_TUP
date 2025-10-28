const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedores.controller");

router.get("/", proveedoresController.getProveedores);
router.post("/", proveedoresController.createProveedor);

module.exports = router;
