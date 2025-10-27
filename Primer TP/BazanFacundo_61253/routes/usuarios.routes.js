const express = require("express")
const router = express.Router()
const {getUsuarios, crearUsuario, updateUsuario, borrarUsuario} = require("../controllers/usuarios.controllers")

router.get("/Usuario", getUsuarios)
router.post("/Usuario/crear",crearUsuario)
router.put("/Usuario/update/:id",updateUsuario)
router.delete("/Usuario/delete/:id",borrarUsuario)

module.exports= router