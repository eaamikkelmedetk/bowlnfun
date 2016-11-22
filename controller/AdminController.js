/**
 * Created by Marcus on 21-11-2016.
 */
'use strict';

var crypto = require('crypto');

var Center = require('../models/center');
var User = require('../models/user');

var saltLength = 16;

module.exports.addCenter = function (req, res) {

    // var nameValidation = req.body.name != undefined;
    // var writeNameValidation = req.body.writeName != undefined;
    // var readNameValidation = req.body.readName != undefined;
    var writePassValidation = req.body.writePass != undefined;
    var readPassValidation = req.body.readPass != undefined;

    var valid =
        writePassValidation &&
        readPassValidation;

    if(valid) {

        var writeSalt = genSalt(saltLength);
        var readSalt = genSalt(saltLength);

        var write = sha512(req.body.writePass, writeSalt);
        var read = sha512(req.body.readPass, readSalt);

        var center = new Center({
            name: req.body.name,
            read: req.body.readName,
            write: req.body.writeName
        });
        var userRead = new User({
            name: req.body.readName,
            password: read.passwordHash,
            salt: read.salt,
            role: 1
        });
        var userWrite = new User({
            name: req.body.writeName,
            password: write.passwordHash,
            salt: write.salt,
            role: 2
        });

        center.save(function (err, doc) {
            if (err) {
                res.status(417).end();
                throw err;
            }
            else {
                userWrite.centerId = userRead.centerId = doc._id;
                userWrite.save(function (err){
                    res.status(417).end();
                    throw err;
                });
                userRead.save(function (err){
                    res.status(417).end();
                    throw err;
                });
                res.json({
                    "message": "The center has been added to the registry",
                    "center": doc
                });
            }
        });
    }
    else res.status(417).end();
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