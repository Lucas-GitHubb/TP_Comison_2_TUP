const express = require("express")
const {getSocios, getSocio, createSocio, updateSocio, darBajaSocio, reactivarSocio} = require("../controllers/socios.controlleres");
const router = express.Router();

router.get("/socios",getSocios);
router.get("/socios/:id", getSocio);
router.post("/socios/crear", createSocio);
router.put("/socios/actualizar/:id",updateSocio);
router.darBajaSocio("/socios/darBaja/:id",darBajaSocio);
router.reactivarSocio("/socios/reactivar/:id",reactivarSocio);

module.exports= router