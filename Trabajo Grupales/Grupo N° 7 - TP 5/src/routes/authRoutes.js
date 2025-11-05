const express = require("express");
const router = express.Router();
const { loginSocio, createSocio} = require("../controllers/socios.controlleres");


router.post("/login", loginSocio);

router.post("/registro", createSocio);

module.exports = router;
