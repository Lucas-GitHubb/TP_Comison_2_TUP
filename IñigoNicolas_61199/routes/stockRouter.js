const express=require("express")
const Router=express.Router()

const { getAllStock, getStock,createStock,updateStock }=require("./../controllers/stockController")

Router.get("/",getAllStock)
Router.get("/:id", getStock)
Router.post("/create", createStock)
Router.put("/update/:id",updateStock)

module.exports=Router