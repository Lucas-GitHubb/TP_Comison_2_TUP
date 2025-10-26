// routes/metricas.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/metricas.controller');

router.get('/', controller.getAll);
router.get('/:clave', controller.getByClave);
router.post('/', controller.create);

module.exports = router;
