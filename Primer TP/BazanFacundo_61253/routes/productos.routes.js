const express = require("express")
const {getProducto, getProductos, createProducto, updateProducto, deleteProducto} = require("../controllers/productos.controllers")
const router = express.Router()

router.get("/productos",getProductos)
router.get("/producto/:id", getProducto)
router.post("/productos/crear",createProducto)
router.put("/producto/update/:id",updateProducto)
router.delete("/producto/delete/:id",deleteProducto)

module.exports= router