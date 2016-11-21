"use strict";


var machineModel = require("../models/machine");
var Handlebars = require("hbs");

module.exports.index = function(req, res) {
    machineModel.find().exec().then(function(machines) {
        res.render('index', {"machines": machines});
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


