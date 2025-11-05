const express = require("express");
const { getUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, GetAllUsuarios } = require("../controllers/usuarios.controller");

const router = express.Router();

router.get("/usuarios/:id_usuario", getUsuarioPorId); 
router.get("/usuarios", GetAllUsuarios);
router.post("/usuario", crearUsuario);
router.put("/usuario", actualizarUsuario);
router.delete("/usuario", eliminarUsuario);

module.exports = router;
