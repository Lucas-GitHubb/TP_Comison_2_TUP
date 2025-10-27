const Router=require('express')
const router = Router()

const {
  getserviciosID,
getservicios,
createservicios,
updateservicios,
deleteservicios
} = require('../controllers/serviciosController')



router.get('/', getservicios)
router.get('/:id', getserviciosID)
router.post('/crear', createservicios)
router.put('/editar/:id', updateservicios)
router.delete('/eliminar/:id', deleteservicios)

module.exports = router