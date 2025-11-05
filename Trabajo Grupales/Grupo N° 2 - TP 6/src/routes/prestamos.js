const express = require("express");
const {getAll,
  getById,
  create,
  update,
  remove} = require("../controllers/prestamos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los prestamos
router.get("/", verifyToken, getAll);

//Traer un prestamo
router.get("/:id", verifyToken, getById);

//Crear un prestamo
router.post("/", verifyToken, create);

//Editar un prestamo
router.put("/:id", verifyToken, update);

//Eliminar un prestamo
router.delete("/:id", verifyToken, remove);

module.exports = router;
