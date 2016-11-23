/**
 * Created by Marcus on 22-11-2016.
 */
var express = require('express');
var router = express.Router();
var authenticationController = require('../controller/AuthenticationController');

router.post('/', authenticationController.authenticateLogin);

router.use(authenticationController.authenticateToken);

module.exports = router;