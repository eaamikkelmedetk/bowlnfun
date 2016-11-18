var express = require('express');
var router = express.Router();
var indexController = require('../controller/IndexController');
var showErrorController = require('../controller/ShowErrorController');

router.get('/', indexController.index);
router.get('/showerrors', showErrorController.index);

module.exports = router;