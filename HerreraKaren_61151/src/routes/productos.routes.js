import Router from 'express';

// importaciones de controladores


import { borrarProducto, CrearProducto, modificarProducto, obtenerProductos, obtenerProductosActivos } from '../controllers/productos.controller.js';

 const router= Router();

 router.get('/', obtenerProductos);
 //ruta proveedores activos
 router.get('/activos', obtenerProductosActivos);
 router.post('/crearProveedor', CrearProducto);
 router.put('/actualizarProveedor/:idProveedor', modificarProducto);
 //put para borrado lógico
 router.put('/borrarProveedor/:idProveedor', borrarProducto);


 export default router;