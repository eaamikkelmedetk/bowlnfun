/**
 * Created by Marcus on 21-11-2016.
 */
var express = require('express');
var router = express.Router();
var adminController = require('../controller/AdminController');

/* POST */
router.post('/centers', adminController.addCenter);

module.exports = router;