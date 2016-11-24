var express = require('express');
var router = express.Router();
var centerController = require('../controller/CenterController');

/* errors */
router.get('/', centerController.index);
router.get('/api/errors', centerController.getErrors);

module.exports = router;