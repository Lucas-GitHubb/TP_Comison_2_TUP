const express = require('express')
const {
  getClientes,
getClienteId,
createCliente,
updateCliente,
deleteCliente
} = require('../controllers/clientes.js')

const router = express.Router()

router.get('/', getClientes)
router.get('/:id', getClienteId)
router.post('/crear', createCliente)
router.put('/editar/:id', updateCliente)
router.delete('/eliminar/:id', deleteCliente)

module.exports = router