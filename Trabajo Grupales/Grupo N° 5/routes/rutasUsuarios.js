const express = require("express");
const Routes = express.Router();

const {
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  login,
  resetPassword,
} = require("./../controllers/usuariosController");
const { verifyToken } = require("../middleware/verify-token");

//Traer todos los proveedores
Routes.get("/", verifyToken, getAllUsuarios);

//Traer un usuario
Routes.get("/:id", verifyToken, getOneUsuario);

//Traer un usuario
Routes.post("/login", login);

//Crear un proveedor
Routes.post("/", createUsuario);

//Actualizar un proveedor
Routes.put("/:id", updateUsuario);

//Eliminar un proveedor
Routes.delete("/:id",verifyToken, deleteUsuario);

//Reset de contraseña
Routes.post("/reset-password", resetPassword);

module.exports = Routes;
