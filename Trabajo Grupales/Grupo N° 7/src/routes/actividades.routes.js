const Router = require("express")

const { verificarToken } = require("../middleware/auth");
const router = Router();
const {getActividades, CreateAtividades, updateActividades, deleteActividades} = require("../controllers/actividades.controler")



router.get("/", getActividades)
router.post("/", verificarToken, CreateAtividades);
router.put("/:id", verificarToken, updateActividades);
router.delete("/:id", deleteActividades)

module.exports = router