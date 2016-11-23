/**
 * Created by Marcus on 22-11-2016.
 */

var crypto = require('crypto')
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');


module.exports.login = function (req, res) {
    res.render('login');
};

module.exports.authenticateLogin = function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user){

        if(err) throw err;
        console.log(user);
        if(user && user.password == sha512(req.body.password, user.salt).passwordHash) {
            var token = jwt.sign({
                sub: user._id,
                centerId: user.centerId,
                permissions: user.role
            }, config.secret, {expiresIn: '24h'});
            console.log(token);
            // return the information including token as JSON
            res.cookie("bowlnfunErrorApp", token, {
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24))
            })
                .json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
            console.log(res.cookie);
        } else res.status(401.1).json({
            success: false,
            message: 'Authentication failed. Wrong username or password.'
        })
    });
};

module.exports.authenticateToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.bowlnfunErrorApp;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                req.permission = function (level) {
                    var permissions = req.decoded.permissions.split(',');
                    var result = false;
                    for(var i = 0; i < permissions.length; i++)
                        if(permissions[i] == level) result = true;
                    return result;
                };
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
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