var machineModel = require("../models/machine");
var Handlebars = require("hbs");

module.exports.index = function(req, res) {
    machineModel.find().exec().then(function(machines) {
        res.render('index', {"machines": machines});
    });
};

Handlebars.registerHelper("modulusEven", function(num, divider, block) {
   if(parseInt(num) % parseInt(divider) === 0) {
        return block.fn(this);
    }
});


