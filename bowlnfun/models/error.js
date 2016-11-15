/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var error = new Schema({
    pins: [],
    type: String,
    machineId: Number
});

module.exports.printError  = function (error) {
    console.log(error.type + " " + error._id.getTimestamp() + " " + error.machineId);
    //return error.type + " " + error._id.getTimestamp() + " " + error.machineId;
}

module.exports = mongoose.model('Error', error);