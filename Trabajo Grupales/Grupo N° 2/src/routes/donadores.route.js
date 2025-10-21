import { Router } from "express";
import { getDonadores, postDonadores, putDonadores, deleteDonadores, getOneDonador } from "../controllers/donadores.controller.js";

const route = Router()

route.get('/', getDonadores)
route.get('/:id', getOneDonador)
route.post('/', postDonadores)
route.put('/:id', putDonadores)
route.delete('/:id', deleteDonadores)


export default route;