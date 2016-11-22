/**
 * Created by Marcus on 22-11-2016.
 */

var crypto = require('crypto')
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');


module.exports.authenticateLogin = function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user){

        // if(err) throw err;
        console.log(user);
        if(user && user.password == sha512(req.body.password, user.salt).passwordHash) {
            var token = jwt.sign(user._doc, config.secret, {expiresIn: '24h'});
            console.log(token);
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        } else res.status(401.1).json({
            success: false,
            message: 'Authentication failed. Wrong username or password.'
        })
    });
};

module.exports.authenticateToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
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
}

function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};