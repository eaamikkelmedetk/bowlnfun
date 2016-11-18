"use strict";
/**
 * ApiController.js
 * @description Handles the serverlogic of getting errors from our own webservice
 * Created by Morten on 15/11/2016.
 */

var Error = require('../models/error');

module.exports.postError = function (req, res) {

    var pinsValidation =  req.body.pins != undefined ? Array.isArray(JSON.parse(req.body.pins)) : false;
    var machineIdValidation = req.body.machineId != undefined;
    var typeValidation = req.body.type != undefined;

    var errorReportAuthorized = pinsValidation && machineIdValidation && typeValidation;


    if(errorReportAuthorized) {

        var errorReport = new Error({
            type: req.body.type,
            machineId: req.body.machineId,
            timestamp: Date.now(),
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
    Error.find().exec()
        .then(function(errors) {
        return res.json({"errors": errors});
    })
};

module.exports.getError = function (req, res) {
    var errorId = req.params.id;
    Error.find({"_id": errorId}).exec()
        .then(function (singleError) {
            return res.json({"error": singleError})
        })
};


