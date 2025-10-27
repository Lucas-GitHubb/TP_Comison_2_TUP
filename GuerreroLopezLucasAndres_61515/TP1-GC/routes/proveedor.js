const express = require("express");
const router = express.Router();
const { getAllProveedores, getOneProovedor, deleteProveedor, updateProveedor, createProveedores } = require("../controllers/proveedor")


router.get("/proveedores", getAllProveedores)
router.get("/proveedores/:id", getOneProovedor)
router.delete("/proveedore/eliminar/:id",deleteProveedor)
router.put("/proveedores/editar/:id",updateProveedor)
router.post("/proveedores/agregar", createProveedores)


module.exports = router;