const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

router.post('/', servicioController.crearServicio);

module.exports = router;