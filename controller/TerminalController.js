var machineModel = require("../models/machine");
var Handlebars = require("hbs");
var Error = require('../models/error');
var moment = require('moment');



module.exports.index = function(req, res) {
    console.log(req.decoded);
    machineModel.find({"centerId": req.decoded.centerId, "state": "normal"}).exec().then(function(machines) {
        res.render('terminal', {"layout": "layoutTerminal.hbs", "machines": machines});
    });
};

Handlebars.registerHelper('grouped_each', function(every, context, options) {
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

module.exports.postError = function (req, res) {
    var pinsValidation =  req.body.pins != undefined ? Array.isArray(JSON.parse(req.body.pins)) : false;
    var machineIdValidation = req.body.machineId != undefined;
    var typeValidation = req.body.type != undefined;

    var errorReportAuthorized = pinsValidation && machineIdValidation && typeValidation;

    if(errorReportAuthorized) {
        var timestamp = moment();
        var errorReport = new Error({
            type: req.body.type,
            machineId: req.body.machineId,
            timestamp: timestamp,
            pins: JSON.parse(req.body.pins)
        });

        errorReport.save(function (err) {
            if (err) {
                res.json({message: "A system error has occured, try again later..."});
            } else {
                res.json({message: "The error has been added to the registry"});
            }
        });
    }
    else res.status(417).json({message: "POST request did not recieve expected data"});
};