var machineModel = require("../models/machine");

module.exports.index = function(req, res) {
    machineModel.find().exec().then(function(machines) {
        res.render('index');
    })
};