/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machine = new Schema({
    machineNumber: String,
    state: String,
    centerId: Number
});

module.exports = mongoose.model('Machine', machine);