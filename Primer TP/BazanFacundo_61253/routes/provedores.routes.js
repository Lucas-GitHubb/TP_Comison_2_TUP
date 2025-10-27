const express = require("express")
const router = express.Router()
const {getProvedors, crearProvedor, updateProvedor, borrarProvedor} = require("../controllers/provedores.controllers")

router.get("/provedor", getProvedors)
router.post("/provedor/crear",crearProvedor)
router.put("/provedor/update/:id",updateProvedor)
router.delete("/provedor/delete/:id",borrarProvedor)

module.exports= router