var errorModel = require("../models/error");
var Handlebars = require("hbs");
var moment = require("moment");


module.exports.index = function (req, res) {
        res.render('showerrors', {layout: 'CenterLayout.hbs'});
};
