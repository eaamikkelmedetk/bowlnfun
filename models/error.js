/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var error = new Schema({
    pins: [],
    type: String,
    machineId: String,
    timestamp: Date
});

module.exports = mongoose.model('Error', error);