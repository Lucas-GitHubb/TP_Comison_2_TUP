const express= require("express")
const Router=express.Router()
const {getUsuario,getAllUsuarios,createUsuario,updateUsuario,deleteUsuario}= require("./../controllers/userControllers")


Router.get("/",getAllUsuarios)
Router.get("/:id",getUsuario)
Router.post("/create",createUsuario)
Router.patch("/update/:id",updateUsuario)
Router.delete("/delete/:id",deleteUsuario)

module.exports=Router