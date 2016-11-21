var errorModel = require("../models/error");
var machineModel = require("../models/machine");
var Handlebars = require("hbs");


module.exports.index = function(req, res) {
    errorModel.aggregate([
        {
            $lookup:
                {
                    from: "machines",
                    localField: "machineId",
                    foreignField: "_id",
                    as: "machine"
                }
        }
    ]).exec().then(function(errors) {

        res.render('showerrors', {layout: 'CenterLayout.hbs', "error": errors});
    })
};

Handlebars.registerHelper("format", function(inputDate) {
    var date = new Date(inputDate);

    var formattedDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " - kl. " + date.getHours() + ":" + date.getMinutes();

    return formattedDate;
});