var Handlebars = require('hbs');

var Center = require('../models/center');
var User = require('../models/user');
var Machine = require('../models/machine');

module.exports.index = function (req, res) {
    Center.find({}).exec()
        .then(function (centers) {
            Machine.find({centerId: centers[0]._id}).exec().then(function (machines) {
                var selectedCenter = {};
                //Initial load will get the first center in the array
                selectedCenter.name = centers[0].name;
                selectedCenter.centerUser = centers[0].read;
                selectedCenter.terminalUser = centers[0].write;

                res.render("admin", {
                    "layout": "layoutAdmin",
                    centers: centers,
                    machines: machines,
                    selectedCenter: selectedCenter
                });
            });
        });
};

module.exports.getCenter = function (req, res) {
    Center.find({}).exec()
        .then(function (centers) {
            objPage = {};
            objPage.allCenters = centers;
            return objPage
        }).then(function (centers) {
        Center.find({name: req.params.name}).then(function (selectedCenter) {
            centers.selectedCenter = selectedCenter;
            return centers
        }).then(function (centersObj) {
            Machine.find({centerId: centersObj.selectedCenter[0]._id}).exec().then(function (machines) {
                centersObj.selectedCenterMachines = machines;
                //res.json(centersObj);
                res.render("admin", {
                    layout: "layoutAdmin",
                    "centers": centersObj.allCenters,
                    "selectedCenter": {
                        "centerUser": centersObj.selectedCenter[0].read,
                        "terminalUser": centersObj.selectedCenter[0].write
                    },
                    "machines": centersObj.selectedCenterMachines
                });
            })
        });
    })
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
        if (i == 0) {
            html = options.fn(context[i]);
        } else {
            html += options.inverse(context[i]);
        }
    }
    return html;
});

// module.exports.index = function (req, res) {
//         res.render('admin', {layout: "layoutAdmin.hbs"});
// };