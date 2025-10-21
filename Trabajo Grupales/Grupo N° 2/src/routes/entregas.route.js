import { Router } from "express";
import { deleteEntrega, getEntregas, getOneEntrega, postEntrega, putEntrega } from "../controllers/entregas.controller.js";

const route = Router()

route.get('/', getEntregas)
route.get('/:id', getOneEntrega)
route.post('/', postEntrega)
route.put('/:id', putEntrega)
route.delete('/:id', deleteEntrega)


export default route;