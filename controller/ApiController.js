"use strict";
/**
 * ApiController.js
 * @description Handles the serverlogic of getting errors from our own webservice
 * Created by Morten on 15/11/2016.
 */

var Error = require('../models/error');
var moment = require('moment');


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
            console.log(err);
            if (err) {
                res.json({message: "A system error has occured, try again later..."});
            } else {
                res.json({message: "The error has been added to the registry"});
            }
        });
    }
    else res.status(417).json({message: "POST request did not recieve expected data"});
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
        }
    ]).exec().then(function (errors) {
        res.json(errors);
    })
};

module.exports.getError = function (req, res) {
    var errorId = req.params.id;
    Error.find({"_id": errorId}).exec()
        .then(function (singleError) {
            return res.json({"error": singleError})
        })
};