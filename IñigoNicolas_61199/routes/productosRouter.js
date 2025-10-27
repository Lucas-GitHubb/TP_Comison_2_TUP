const express=require("express")
const Router= express.Router()

const {getAllProductos,getProductos,createProducto,updateProducto,deleteProducto}= require("./../controllers/productosController")

Router.get("/", getAllProductos)
Router.get("/:id", getProductos)
Router.post("/create", createProducto)
Router.patch("/update/:id", updateProducto)
Router.delete("/delete/:id", deleteProducto)

module.exports= Router