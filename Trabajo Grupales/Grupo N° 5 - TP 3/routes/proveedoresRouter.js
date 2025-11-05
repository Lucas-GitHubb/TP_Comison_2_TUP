const express = require("express");
const Routes = express.Router();

const {
  getAllProveedores,
  getProveedores,
  createProveedores,
  updateProveedores,
  deleteProveedores,
} = require("./../controllers/proveedoresControllers");

//Traer todos los proveedores
Routes.get("/", getAllProveedores);

//Traer un proveedor
Routes.get("/buscador", getProveedores);

//Crear un proveedor
Routes.post("/create", createProveedores);

//Actualizar un proveedor
Routes.put("/update/:id", updateProveedores);

//Eliminar un proveedor
Routes.delete("/delete/:id", deleteProveedores);

module.exports = Routes;
