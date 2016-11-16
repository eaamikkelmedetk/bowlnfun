/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machine = new Schema({
    state: String,
    centerId: Number,
});

error.methods.printError = function () {
    console.log(this.state + " " + this.centerId);
    return this.state + " " + this.centerId;
}

module.exports = mongoose.model('Machine', machine);