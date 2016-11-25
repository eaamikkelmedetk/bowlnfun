/**
 * Created by Mikkel on 24-11-2016.
 */

var Error = require('../models/error');
var moment = require('moment');

module.exports.index = function (req, res) {
    res.render('center', {layout: 'layoutCenter.hbs'});
};

module.exports.getErrors = function(req, res) {
    var fDate = req.query.fDate;
    var tDate = req.query.tDate;

    fDate = moment(fDate).hours(0, 'h');
    tDate = moment(tDate).hours(23, 'h').minutes(59);

    var testFromDate = "2016-11-20T00:00:00Z";
    var testToDate = "2016-11-23T23:59:00Z";

    Error.aggregate([
        {
            $match: {
                "timestamp": {$gte: new Date(fDate), $lte: new Date(tDate)}
            }
        },
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
                "machine.machineNumber": 1
            }
        },
        {
            $sort: {
                "timestamp": -1
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
                "_id.machineNumber": 1
            }
        }
    ]).exec().then(function (errors) {
        res.json(errors);
    })
};