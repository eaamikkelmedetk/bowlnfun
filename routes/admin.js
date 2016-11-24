/**
 * Created by Marcus on 21-11-2016.
 */
var express = require('express');
var router = express.Router();
var adminController = require('../controller/AdminController');
var User = require('../models/user');

/* POST */

router.post('/api/centers', adminController.addCenter);
/* PUT */
router.put('/api/centers', adminController.editCenter);

router.put('/api/users', adminController.editUser);
/* GET */
router.get('/api/centers', adminController.getCenters);

/* GET users listing. */
router.get('/api/users', function(req, res, next) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/api/users/:name', adminController.getUser);


module.exports = router;