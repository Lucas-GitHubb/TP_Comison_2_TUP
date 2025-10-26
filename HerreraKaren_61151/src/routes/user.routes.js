import Router from 'express';

// importaciones de controladores

import { CrearUsuario,obtenerUsuarios,modificarUsuario,borrarUsuario, obtenerUsuariosActivos }  from '../controllers/user.controller.js';

 const router= Router();

 router.get('/', obtenerUsuarios);
 //ruta usuarios activos
 router.get('/activos', obtenerUsuariosActivos);
 router.post('/crearUsuario', CrearUsuario);
 router.put('/actualizarUsuario/:idUsuario', modificarUsuario);
 //put para borrado lógico
 router.put('/borrarUsuario/:idUsuario', borrarUsuario);


 export default router;