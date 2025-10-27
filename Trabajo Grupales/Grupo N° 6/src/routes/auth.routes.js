const express = require('express');
const router = express.Router();

const {
  register,
  login,
  me,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/auth.controller');

const { authRequired } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authRequired, me);
router.post('/password/request-reset', requestPasswordReset);
router.post('/password/reset', resetPassword);

module.exports = router;