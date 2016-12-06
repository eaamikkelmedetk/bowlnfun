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

module.exports.authenticateLogin = function (req, res, next) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (user && user.password == sha512(req.body.password, user.salt).passwordHash && user.active) {
            var token = jwt.sign({
                sub: user._id,
                centerId: user.centerId,
                permissions: user.role
            }, config.secret, {expiresIn: '7d'});
            // return the information including token as JSON
            res.cookie("bowlnfunErrorApp", token, {
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
            })
                .redirect('/');
        } else res.status(401.1 || 500).render('error', {"title": "Loginoplysninger", "message": "De indtastede brugeroplysninger var ikke korrekte"});
    });
};

module.exports.redirect = function (req, res, next) {
    authenticateTokenAndRedirect({
        req: req,
        res: res,
        next: next
    });
};

module.exports.terminalAccess = function (req, res, next) {
    authenticateTokenAndRedirect({
        req: req,
        res: res,
        next: next,
        role: 'write-access'
    });
};
module.exports.centerAccess = function (req, res, next) {
    authenticateTokenAndRedirect({
        req: req,
        res: res,
        next: next,
        role: 'read-access'
    });
};
module.exports.adminAccess = function (req, res, next) {
    authenticateTokenAndRedirect({
        req: req,
        res: res,
        next: next,
        role: 'admin'
    });
};

function authenticateTokenAndRedirect(dat) {

    dat.token = dat.req.body.token
        || dat.req.query.token
        || dat.req.headers['x-access-token']
        || dat.req.cookies.bowlnfunErrorApp;

    if (dat.token) verifyToken(dat);
    else dat.res.redirect('/login');
};

function verifyToken(dat) {
    jwt.verify(dat.token, config.secret, function (err, decoded) {
        dat.decoded = decoded;

        if (err) {
            dat.res.status(403).render('error', {"title": "Token verification", "message": "Token verification failed."});
            throw err;
        }
        else useToken(dat);
    });
};

// function validateTokenUser(dat) {
//     User.findOne({
//         _id: dat.decoded.sub
//     }, function (err, user) {
//         dat.user = user;
//         if (err) {
//             throw err;
//             dat.res.status(403).render('error', {"title": "Token validation", "message": "Token validation failed."});
//         } else if (dat.user.centerId == dat.decoded.centerId)
//             useToken(dat);
//         else dat.res.status(403).render('error', {"title": "Token validation", "message": "Token validation failed."});
//     });
// };

function useToken(dat) {
    // Add custom properties to decoded
    dat.req.decoded = expandDecoded(dat.decoded);


    if (dat.next && dat.req.decoded.permission(dat.role)) {
        dat.next();

    } else if (dat.role) {
        dat.res.redirect('/login');
    }
    else {
        var path = "";
        switch (dat.req.decoded.primary) {
            case "read-access":
                path = '/center';
                break;
            case "write-access":
                path = '/terminal';
                break;
            case "admin":
                path = '/admin';
                break;
            default:
                path = '/login';
                break;
        }
        dat.res.redirect(path);
    }
}

function expandDecoded(decoded) {

    // if everything is good, save to request for use in other routes
    var permissions = decoded.permissions.toString().split(',');
    decoded.primary = permissions[0];
    decoded.permission = function (level) {
        var result = false;
        for (var i = 0; i < permissions.length; i++)
            if (permissions[i] == level) result = true;
        return result;
    };
    return decoded;
};

function errorMessage(text, code) {
    var err = new Error(text);
    err.status = code;
    return err;
};

function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};