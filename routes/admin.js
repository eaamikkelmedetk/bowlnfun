/**
 * Created by Marcus on 21-11-2016.
 */
var express = require('express');
var router = express.Router();
var adminController = require('../controller/AdminController');

/* POST */
router.post('/centers', adminController.addCenter);

/* PUT */
router.put('/centers', adminController.editCenter);
router.put('/users', adminController.editUser);

/* GET */
router.get('/centers', adminController.getCenters);
router.get('/users/:name', adminController.getUser);

module.exports = router;