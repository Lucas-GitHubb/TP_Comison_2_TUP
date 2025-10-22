const express = require("express");
const Routes = express.Router();

const {
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("./../controllers/usuariosController");

//Traer todos los proveedores
Routes.get("/", getAllUsuarios);

//Traer un proveedor
Routes.get("/:id", getOneUsuario);

//Crear un proveedor
Routes.post("/", createUsuario);

//Actualizar un proveedor
Routes.put("/:id", updateUsuario);

//Eliminar un proveedor
Routes.delete("/:id", deleteUsuario);

module.exports = Routes;
