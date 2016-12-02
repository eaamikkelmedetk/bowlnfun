/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var moment = require("moment");
var Schema = mongoose.Schema;

var error = new Schema({
    pins: Array,
    type: String,
    timestamp: {type: Date, default: moment().toISOString()},
    machineId: {type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('Error', error);