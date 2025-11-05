const express = require("express")
const router = express.Router()

const { getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct, getBestSellingProduct } = require("../controllers/producto")


router.get("/", getAllProducts)
router.get("/getOne/:id", getOneProduct)
router.get("/masvendido", getBestSellingProduct)
router.delete("/eliminar/:id",deleteProduct)
router.put("/Update/:id", updateProduct)
router.post("/agregar" , createProduct)




module.exports = router;