const express = require("express");
const { getAllUsuario, getOneUsuario, deleteUsuario, updateUsuario, createUsuario } = require("../controllers/usuario");
const router = express.Router();



router.get("/", getAllUsuario)
router.get("/getOne/:id", getOneUsuario)
router.delete("/delete/:id",deleteUsuario)
router.put("/Update/:id", updateUsuario)
router.post("/Create/" ,createUsuario) 


module.exports= router;