var express = require('express');
var router = express.Router();
var apiController = require('../controller/ApiController')

/* POST */
router.get('/errors', apiController.getErrors);
router.get('/errors/:id', apiController.getError);
router.post('/errors', apiController.postError);

module.exports = router;
