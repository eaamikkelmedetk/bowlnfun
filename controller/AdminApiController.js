/**
 * Created by Marcus on 21-11-2016.
 */
'use strict';

var crypto = require('crypto');
var Handlebars = require('hbs');
var async = require('async');

var Center = require('../models/center');
var User = require('../models/user');
var Machine = require('../models/machine');

var saltLength = 16;

module.exports.addCenter = function (req, res) {

    var writePassValidation = req.body.writePass != undefined;
    var readPassValidation = req.body.readPass != undefined;

    var valid =
        writePassValidation &&
        readPassValidation;

    if (valid) {

        var writeSalt = genSalt(saltLength);
        var readSalt = genSalt(saltLength);

        var write = sha512(req.body.writePass, writeSalt);
        var read = sha512(req.body.readPass, readSalt);

        var center = new Center({
            name: req.body.name,
            read: req.body.readName,
            write: req.body.writeName,
            active: true
        });

        var userRead = new User({
            name: req.body.readName,
            password: read.passwordHash,
            salt: read.salt,
            role: 'read-access',
            active: true
        });

        var userWrite = new User({
            name: req.body.writeName,
            password: write.passwordHash,
            salt: write.salt,
            role: 'write-access',
            active: true
        });


        center.save(function (err, doc) {
            if (err) {
                res.status(417).json({success: false, message: "'center' failed validation"});
            }
            else {
                userWrite.centerId = userRead.centerId = doc._id;
                userWrite.save(function (err) {
                    if (err) res.status(417).json({success: false, message: "'userWrite' failed validation"});
                    else userRead.save(function (err) {
                        if (err) res.status(417).json({success: false, message: "'userRead' failed validation"});
                        else res.json({
                            "success": true,
                            "message": "The center has been added to the registry",
                            "center": doc
                        });
                    });
                });
            }
        });
    }
    else res.status(417).json({success: false, message: "no passwords defined"});
};

module.exports.addMachine = function (req, res) {
    var newMachine = new Machine({
        machineNumber: req.body.machineNumber,
        state: req.body.state,
        centerId: req.body.centerId
    });
    newMachine.save(function (err, machine) {
        if (err) res.status(417).json({success: false, message: "'machine' failed validation"});
        else res.json({
            "message": "The machine has been added to the registry",
            "machine": machine
        });
    });
};


module.exports.editCenter = function (req, res) {
    Center.findOne({
        name: req.body.name
    }, function (err, center) {
        if (err) throw err;

        if (center) {
            if (req.body.name) center.name = req.body.name;
            if (req.body.active) {
                center.active = req.body.active;
                User.update({centerId: center._id}, {active: req.body.active}, {multi: true}).exec();
            }

            center.save();

            res.json({success: true, message: "'center' with id " + req.body.id + " updated"});
        }
        else res.status(404).json({success: false, message: "No 'center' with id " + req.body.id + " found"});
    });
};

module.exports.editUser = function (req, res) {
    User.findOne({
        _id: req.body.id
    }, function (err, user) {
        if (err) throw err;

        if (req.body.name) user.name = req.body.name;
        if (req.body.password) {
            var pass = sha512(req.body.password, genSalt(saltLength));
            user.password = pass.passwordHash;
            user.salt = pass.salt;
        }
        if (req.body.role) user.role = req.body.permissions;

        if (user) {
            user.update(newUser, {});
            res.json({success: true, message: "'user' with id " + req.body.id + " updated"});
        } else res.status(404).json({success: false, message: "No 'user' with id " + req.body.id + " found"});
    });
};

module.exports.editUser1 = function (req, res) {
    async.series([
        function(callback) {
            User.findOne({"_id": req.body.id}).exec().then(function(user) {
                console.log(req.body.id);
                callback(null, user);
            });
        },
        function(callback) {
            Center.findOne({"_id": req.body.centerid}).exec().then(function(center) {
               callback(null, center);
            });
        }
    ], function(err, results) {
        var userId = results[0]._id;
        var userName = results[0].name;
        var centerId = results[1]._id;
        var terminalUser = results[1].write;
        var pass = sha512(req.body.password, genSalt(saltLength));




            async.series([
                function(callback) {
                    User.update({"_id": userId}, {"name": req.body.name, "password": pass.passwordHash, "salt": pass.salt}, function() {
                        callback(null);
                    })
                },
                function(callback) {
                if(userName === terminalUser) {
                    Center.update({"_id": centerId}, {"write": req.body.name}, function () {
                        callback(null);
                    })
                } else {
                    Center.update({"_id": centerId}, {"read": req.body.name}, function () {
                        callback(null);
                    })
                }
                }
            ], function(err, results) {
                res.json("Brugernavnet og passwordet er blevet opdatereret.");
            })

    });
};


module.exports.editMachine = function (req, res) {
    Machine.findOne({
        _id: req.body.id
    }, function (err, machine) {
        if (err) throw err;

        if (machine) {
            if (req.body.machineNumber) machine.machineNumber = req.body.machineNumber;
            if (req.body.state) machine.state = req.body.state;
            if (req.body.role) machine.role = req.body.permissions;

            machine.save();

            res.json({success: true, message: "'machine' with id " + req.body.id + " updated"});
        } else res.status(404).json({success: false, message: "No 'machine' with id " + req.body.id + " found"});
    });
};

module.exports.getMachinesFromCenter = function (req, res) {
    Machine.find({centerId: req.params.id}, function (err, machines) {
        if (err) throw err;
        res.json(machines);
    });
};
module.exports.getMachine = function (req, res) {
    Machine.findOne({_id: req.params.id}, function (err, machine) {
        if (err) throw err;
        res.json(machine);
    });
};
module.exports.getCenters = function (req, res) {
    Center.find({}, function (err, centers) {
        if (err) throw err;
        res.json(centers);
    });
};

module.exports.getCenter = function (req, res) {
    var query = {};
    if (req.params.name) query.name = req.params.name;
    if (req.params.id) query._id = req.params.id;
    Center.findOne(query, function (err, center) {
        if (err) throw err;
        res.json(center);
    });
};
module.exports.getUser = function (req, res) {
    User.findOne({
        name: req.params.name
    }, function (err, user) {
        if (err) throw err;
        if (user) res.json(user);
        else res.status(404).json({success: false, message: "User not found"})
    })
};


module.exports.getUsers = function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
};

function genSalt(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}
function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
}
