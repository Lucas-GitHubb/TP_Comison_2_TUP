const express = require('express');
const router = express.Router();
const sociosController = require('../controllers/socios.controller');

// Rutas CRUD
router.get('/', sociosController.getAll);
router.get('/:id', sociosController.getById);
router.post('/', sociosController.create);
router.put('/:id', sociosController.update);
router.delete('/:id', sociosController.remove);

module.exports = router;