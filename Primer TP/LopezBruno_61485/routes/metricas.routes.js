const express = require("express");
const router = express.Router();
const metricasController = require("../controllers/metricas.controller");

router.get("/", metricasController.getMetricas);

module.exports = router;
