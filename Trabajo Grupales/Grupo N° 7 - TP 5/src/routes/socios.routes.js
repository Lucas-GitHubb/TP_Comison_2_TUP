const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middleware/auth");

const {
  getSocios,
  getSocio,
  createSocio,
  updateSocio,
  darBajaSocio,
  reactivarSocio,
  loginSocio,
  recuperarPassword
} = require("../controllers/socios.controlleres");


router.post("/login", loginSocio);
router.post("/recuperar", recuperarPassword);
router.post("/crear", createSocio);

router.get("/", verificarToken, getSocios);
router.get("/:id", verificarToken, getSocio);
router.put("/actualizar/:id", verificarToken, updateSocio);
router.put("/darBaja/:id", verificarToken, darBajaSocio);
router.put("/reactivar/:id", verificarToken, reactivarSocio);

module.exports = router;
