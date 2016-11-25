/**
 * Created by Marcus on 21-11-2016.
 */
var express = require('express');
var router = express.Router();
var adminController = require('../controller/AdminController');
var User = require('../models/user');

router.get('/', adminController.index);

/* POST */
router.post('/api/centers', adminController.addCenter);
router.post('/api/machine', adminController.addMachine);

/* PUT */
router.put('/api/centers', adminController.editCenter);
router.put('/api/machines', adminController.editMachine);
router.put('/api/users', adminController.editUser);

/* GET */
router.get('/api/centers', adminController.getCenters);
router.get('/api/machines', adminController.getMachinesFromCenter);
router.get('/api/machine/:id', adminController.getMachine);
router.get('/api/users', adminController.getUsers);
router.get('/api/users/:name', adminController.getUser);


module.exports = router;