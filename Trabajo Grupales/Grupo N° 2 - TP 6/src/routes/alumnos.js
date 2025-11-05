const express = require("express");
const {getAll,
  getById,
  create,
  update,
  remove} = require("../controllers/alumnos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los alumnos
router.get("/", verifyToken, getAll);

//Traer un alumno
router.get("/:id", verifyToken, getById);

//Crear un alumno
router.post("/", verifyToken, create);

//Editar un alumno
router.put("/:id", verifyToken, update);

//Eliminar un alumno
router.delete("/:id", verifyToken, remove);

module.exports = router;
