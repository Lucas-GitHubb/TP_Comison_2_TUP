const express = require("express");
const { getAllVentas, updateVenta } = require("../controllers/ventas"); 
const router = express.Router();


router.get("/",getAllVentas) 
router.put("/Update", updateVenta)



module.exports = router;
