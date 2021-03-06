const Router = require('express');
const router = new Router();
const AuthController = require('./controllers/authController/index');

router.post('/auth/register', AuthController.register);//
router.post('/auth/login', AuthController.login);//

module.exports = router;