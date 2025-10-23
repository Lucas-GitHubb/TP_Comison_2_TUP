const express = require('express');
const router = express.Router();
const {
  getTurnos,
  getTurnoID,
  createTurno,
  updateTurno,
  deleteTurno
} = require('../controllers/Turnos');

router.get('/', getTurnos);
router.get('/:id', getTurnoID);
router.post('/crear', createTurno);
router.put('/:id', updateTurno);
router.delete('/:id', deleteTurno);

module.exports = router;
