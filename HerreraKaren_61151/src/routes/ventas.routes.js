import Router from 'express';

// importaciones de controladores


import { crearUnaVenta, traerVentaPorId, traerVentas } from '../controllers/ventas.controller.js';

 const router= Router();

 router.get('/', traerVentas);
 router.post('/:idVenta', traerVentaPorId);
 router.put('/crearVenta', crearUnaVenta);


 export default router;