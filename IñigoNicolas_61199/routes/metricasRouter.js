const express=require("express")
const Router=express.Router()

const {getMetricasVentas,getMetricasProductos}=require("./../controllers/metricasControllers")

Router.get("/ventas",getMetricasVentas)
Router.get("/productos",getMetricasProductos)

module.exports=Router