const router = require(`express`);
const {solicitarReset,resetPassword} = require("../controllers/auth.controller");

router.post(`solicitar-reset`, solicitarReset);
router.post(`reset-password`, resetPassword);

module.exports = router;