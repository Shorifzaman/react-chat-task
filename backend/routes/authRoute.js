const router = require('express').Router();
const {
  userRegister,
  userLogin,
  userLogout,
  getSingleUserInfo,
} = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-logout', userLogout);
router.get('/user-info', getSingleUserInfo);

module.exports = router;
