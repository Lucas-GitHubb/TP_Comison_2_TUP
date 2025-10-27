const express = require("express");
const { getAllStock } = require("../controllers/stock");

const router = express.Router();

router.get("/", getAllStock)




module.exports = router;