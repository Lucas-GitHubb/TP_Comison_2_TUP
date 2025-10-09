import Router from 'express';

// importaciones de controladores

import { borrarProveedor, CrearProveedor, modificarProveedor, obtenerProveedores, obtenerProveedoresActivos } from '../controllers/proveedores.controller.js';

 const router= Router();

 router.get('/', obtenerProveedores);
 //ruta proveedores activos
 router.get('/activos', obtenerProveedoresActivos);
 router.post('/crearProveedor', CrearProveedor);
 router.put('/actualizarProveedor/:idProveedor', modificarProveedor);
 //put para borrado lógico
 router.put('/borrarProveedor/:idProveedor', borrarProveedor);


 export default router;