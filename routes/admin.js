/**
 * Created by Marcus on 21-11-2016.
 */
var express = require('express');
var router = express.Router();
var AdminController = require('../controller/AdminController');
var AdminApiController = require('../controller/AdminApiController');
var User = require('../models/user');

router.get('/', AdminController.index);
router.get('/:name', AdminController.getCenter);

/* POST */
router.post('/api/centers', AdminApiController.addCenter);
router.post('/api/machine', AdminApiController.addMachine);

/* PUT */
router.put('/api/centers', AdminApiController.editCenter);
router.put('/api/machines', AdminApiController.editMachine);
router.put('/api/users', AdminApiController.editUser1);

/* GET */
router.get('/centers/:name', AdminApiController.getCenter);

router.get('/api/centers', AdminApiController.getCenters);
router.get('/api/centers/:name', AdminApiController.getCenter);
router.get('/api/machines/:id', AdminApiController.getMachinesFromCenter);
router.get('/api/machine/:id', AdminApiController.getMachine);
router.get('/api/users', AdminApiController.getUsers);
router.get('/api/users/:name', AdminApiController.getUser);


module.exports = router;