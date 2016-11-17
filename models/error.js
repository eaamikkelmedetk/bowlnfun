/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var error = new Schema({
    pins: Array,
    type: String,
    timestamp: Date,
    machineId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Error', error);