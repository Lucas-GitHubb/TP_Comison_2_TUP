const express = require('express');
const router = express.Router();
const deportesController = require('../controllers/deportes.controller');

// Rutas CRUD
router.get('/', deportesController.getAll);
router.get('/:id', deportesController.getById);
router.post('/', deportesController.create);
router.put('/:id', deportesController.update);
router.delete('/:id', deportesController.remove);

module.exports = router;
