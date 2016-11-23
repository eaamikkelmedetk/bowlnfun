/**
 * Created by Marcus on 22-11-2016.
 */
var express = require('express');
var router = express.Router();
var loginController = require('../controller/LoginController');

router.post('/', loginController.authenticateLogin);
router.get('/', loginController.login);
router.use(loginController.authenticateToken);

module.exports = router;