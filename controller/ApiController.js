"use strict";
/**
 * ApiController.js
 * @description Handles the serverlogic of getting errors from our own webservice
 * Created by Morten on 15/11/2016.
 */

var Error = require('../models/error');

module.exports.postError = function (req, res) {
    var error = new Error({
        pins: req.body.pins,
        type: req.body.type,
        machineId: req.body.machineId,
        timestamp: Date.now()
    });

    error.save(function (err) {
        if (err) {
            res.json({message: "A system error has occured, try again later..."});
        } else {
            res.json({message: "The error has been added to the registry"});
        }
    })
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


