/**
 * Created by Marcus on 22-11-2016.
 */
var express = require('express');
var router = express.Router();
var loginController = require('../controller/LoginController');

router.get('/', loginController.redirect);
router.get('/login', loginController.login);
router.post('/login/authenticate', loginController.authenticateLogin);

module.exports = router;