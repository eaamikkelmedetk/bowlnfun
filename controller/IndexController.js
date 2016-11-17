var machineModel = require("../models/machine");
var Handlebars = require("hbs");

module.exports.index = function(req, res) {
    machineModel.find().exec().then(function(machines) {
        res.render('index', {"machines": machines});
    });
};


Handlebars.registerHelper("modulusStart", function(num, block) {
    if (parseInt(num) % parseInt(12) === 0) {
        return block.fn(this);
    }
});

Handlebars.registerHelper("modulusEnd", function(num, block) {
    if (parseInt(num) % parseInt(12) !== 0) {
        return block.fn(this);
    }
});