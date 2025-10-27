const express=require("express")
const Router= express.Router()

const {getProveedor,getAllProveedores,createProveedor,updateProveedor,deleteProveedor}=require("./../controllers/proveedoresController")


Router.get("/",getAllProveedores)
Router.get("/:id",getProveedor)
Router.post("/create",createProveedor)
Router.patch("/update/:id",updateProveedor)
Router.delete("/delete/:id",deleteProveedor)

module.exports= Router