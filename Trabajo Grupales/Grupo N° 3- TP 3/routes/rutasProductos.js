// Importamos las dependencias necesarias

// Express es el framework que usamos para manejar las rutas y peticiones HTTP
const express = require("express");
// Importamos las funciones del controlador de productos
const { getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct } = require("../controllers/productosController");
// Creamos un enrutador (objeto que agrupa todas las rutas de productos)
const router = express.Router()



// RUTAS DE PRODUCTOS
// Trae todos los productos de la base de datos
router.get("/", getAllProducts)

// Trae un solo producto según su ID (recibido por parámetro en la URL)
router.get("/getOne/:id", getOneProduct)

// Elimina un producto (borrado lógico: cambia su estado a inactivo)
router.delete("/delete/:id", deleteProduct)

// Actualiza los datos de un producto existente (según su ID)
router.put("/update/:id", updateProduct)

// Crea un nuevo producto en la base de datos
router.post("/create", createProduct)


// Exportamos el router para poder usarlo en index.js
module.exports = router;