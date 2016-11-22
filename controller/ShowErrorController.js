var errorModel = require("../models/error");
var machineModel = require("../models/machine");
var Handlebars = require("hbs");


module.exports.index = function (req, res) {

    // errorModel.find({}).populate({path: 'machineId', select: 'machineNumber'}).select({"_id": 1, "type": 1, "machineId": 1}).exec().then(function(errors) {
    //     res.json(errors);
    // });

    errorModel.aggregate([
        {
            $lookup: {
                from: "machines",
                localField: "machineId",
                foreignField: "_id",
                as: "machine"
            }
        },
        {
            $unwind: {
                path: "$machine"
            }
        },
        {
            $project: {
                "type": 1,
                "timestamp": 1,
                "pins": 1,
                "machine.machineNumber": 1,
            }
        },
        {
            $group: {
                "_id": { machineNumber: "$machine.machineNumber"},
                "type": { $push: "$type"},
                "timestamp": { $push: "$timestamp"},
                "pins": {$push: "$pins"}
            }
        },
        {
            $sort: {
                "_id.machineNumber": 1,
                "timestamp": 1
            }
        },
    ]).exec().then(function (errors) {

        //res.json(errors);
        res.render('showerrors', {layout: 'CenterLayout.hbs', "error": errors});
    })
};

Handlebars.registerHelper("format", function (inputDate) {
    var date = new Date(inputDate);

    var formattedDate = "Dato: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " - kl. " + date.getHours() + ":" + addZero(date.getUTCMinutes());

    return formattedDate;
});

Handlebars.registerHelper('getDate', function() {
   return new Date().getDate();
});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
