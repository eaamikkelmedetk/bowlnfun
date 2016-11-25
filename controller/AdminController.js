/**
 * Created by Marcus on 21-11-2016.
 */
'use strict';

var crypto = require('crypto');

var Center = require('../models/center');
var User = require('../models/user');

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
        console.log(userRead);
        var userWrite = new User({
            name: req.body.writeName,
            password: write.passwordHash,
            salt: write.salt,
            role: 'write-access',
            active: true
        });

        center.save(function (err, doc) {
            if (err) {
                res.status(417).end();
                throw err;
            }
            else {
                var rollback = false;
                userWrite.centerId = userRead.centerId = doc._id;
                userWrite.save(function (err) {
                    if (err) {
                        rollback = true;
                        throw err;
                        res.status(417).end();
                    }
                });
                userRead.save(function (err) {
                    if (err) {
                        rollback = true;
                        throw err;
                        res.status(417).end();
                    }
                });
                if (rollback) {
                    Center.remove({_id: doc._id});
                    User.remove({centerId: doc._id});
                }
                res.json({
                    "message": "The center has been added to the registry",
                    "center": doc
                });
            }
        });
    }
    else res.status(417).end();
};


module.exports.editCenter = function (req, res) {
    Center.findOne({
        _id: req.body.id
    }, function (err, center) {
        if (err) throw err;

        var newCenter = {};

        if (req.body.name) newCenter.name = req.body.name;
        if (req.body.active) {
            newCenter.active = req.body.active;
            User.update({centerId: req.body.id}, {active: req.body.active}, {multi: true}).exec();
        }
        if (center) {
            center.update(newCenter, {}).exec();
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

        var newUser = {};

        if (req.body.name) newUser.name = req.body.name;
        if (req.body.password) {
            var pass = sha512(req.body.password, genSalt(saltLength));
            newUser.password = pass.passwordHash;
            newUser.salt = pass.salt;
        }
        if (req.body.role) newUser.role = req.body.permissions;

        if (user) {
            user.update(newUser, {});
            res.json({success: true, message: "'user' with id " + req.body.id + " updated"});
        } else res.status(404).json({success: false, message: "No 'user' with id " + req.body.id + " found"});
    });
};

module.exports.getCenters = function(req,res) {
    Center.find({}, function (err, centers) {
        if (err) throw err;
        res.json(centers);
    });
};
module.exports.getUser = function(req,res){
    User.findOne({
        _id: req.params.name
    }, function (err, user){
        if(err) throw err;
        if(user) res.json({
            success: true,
            message: "Here is the user requested. Enjoy!",
            user: user
        });
        else res.status(404).json({success: false, message: "User not found"})
    })
};

function genSalt(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};