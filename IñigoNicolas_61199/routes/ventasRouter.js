const express=require("express")
const Router=express.Router()

const {getAllVentas,getVentas,createVentas,getVentasUsuario,updateVentaEstado,updateVentaCompleta}=require("./../controllers/ventasController")


Router.get("/",getAllVentas)
Router.get("/:id",getVentas)
Router.get("/buscar/:id",getVentasUsuario)
Router.post("/create",createVentas)
Router.patch("/updateVentaEstado",updateVentaEstado)
Router.patch("/updateVentaCompleta",updateVentaCompleta)

module.exports=Router