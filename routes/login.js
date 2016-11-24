/**
 * Created by Marcus on 22-11-2016.
 */
var express = require('express');
var router = express.Router();
var loginController = require('../controller/LoginController');

router.get('/login', loginController.login);
router.post('/login/authenticate', loginController.authenticateLogin);
router.use(loginController.authenticateToken);

module.exports = router;