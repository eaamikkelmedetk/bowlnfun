/**
 * Created by Mikkel on 24-11-2016.
 */

var Error = require('../models/error');
var moment = require('moment');
var mongoose = require('mongoose');

module.exports.index = function (req, res) {
    res.render('center', {layout: 'layoutCenter.hbs', "title": "Fejlrapport"});
};

module.exports.getErrors = function(req, res) {
    var getPermittedCenter = mongoose.Types.ObjectId(req.decoded.centerId);
    var fDate = req.query.fDate;
    var tDate = req.query.tDate;

    fDate = moment(fDate).hours(0, 'h').toDate();
    tDate = moment(tDate).hours(23, 'h').minutes(59).toDate();


    Error.aggregate([
        {
            $match: {
                "timestamp": {$gte: fDate, $lte: tDate}
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
            $match: {
                "machine.state": "normal"
            }
        },
        {
            $match: {
                "machine.centerId": getPermittedCenter
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
                "machine.centerId": 1
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
