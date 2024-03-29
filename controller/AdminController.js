var Handlebars = require('hbs');

var async = require("async");
var Center = require('../models/center');
var User = require('../models/user');
var Machine = require('../models/machine');

module.exports.index = function (req, res) {
    async.series([
            function (callback) {
                Center.find({"active": true}, null, {sort: {name: 1}}).exec().then(function (centers) {
                    req.params.selectedCenter = centers[0]._id;
                    callback(null, centers);
                })
            },
            function (callback) {
                Machine.find({centerId: req.params.selectedCenter, state: 'normal'}, null, {sort: {machineNumber: 1}}).exec().then(function (machines) {
                    callback(null, machines);
                });
            },
        function(callback) {
            Center.find({}, null, {sort: {name: 1}}).exec().then(function (allCenters) {
                callback(null, allCenters);
            });
        }
        ], function (err, results) {
            var centers = results[0];
            var selectedCenterId = results[0][0]._id;
            var centerUser = results[0][0].read;
            var terminalUser = results[0][0].write;
            var machines = results[1];
            var allCenters = results[2];



            res.render("admin", {
                layout: "layoutAdmin",
                title: "Administration",
                centers: centers,
                centerUser: centerUser,
                terminalUser: terminalUser,
                selectedCenterId: selectedCenterId,
                machines: machines,
                allCenters: allCenters
            });
        }
    );
};


module.exports.getCenter = function (req, res) {
    async.series([
        function (callback) {
            Center.find({"active": true}, null, {sort: {name: 1}}).exec().then(function (centers) {
                callback(null, centers);
            });
        },
        function (callback) {
            Center.find({name: req.params.name}).then(function (selectedCenter) {
                req.params.selectedCenterName = selectedCenter[0]._id;
                callback(null, selectedCenter);
            })
        },
        function (callback) {
            Machine.find({centerId: req.params.selectedCenterName, state: 'normal'}, null, {sort: {machineNumber: 1}}).exec().then(function (machines) {
                callback(null, machines);
            });
        },
        function(callback) {
            Center.find({}, null, {sort: {name: 1}}).exec().then(function (allCenters) {
                callback(null, allCenters);
            });
        }
    ], function (err, results) {
        var activeCenters = results[0];
        var selectedCenter = results[1][0];
        var selectedCenterId = results[1][0]._id;
        var machines = results[2];
        var allCenters = results[3];

        res.render("admin", {
            layout: "layoutAdmin",
            title: "Administration",
            centers: activeCenters,
            selectedCenterId: selectedCenterId,
            centerUser: selectedCenter.read,
            terminalUser: selectedCenter.write,
            machines: machines,
            allCenters: allCenters
        });
    });
};


Handlebars.registerHelper('grouped_each', function (every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

Handlebars.registerHelper('menuhelper', function (context, options) {
    var html = "";
    for (var i = 0; i < context.length; i++) {
        if(context[i].active == false) {
            html += options.fn(context[i]);
        } else {
            html += options.inverse(context[i]);
        }
    }
    return html;
});