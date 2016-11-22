/**
 * Created by Marcus on 21-11-2016.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var center = new Schema({
    write: {
        type: String,
        required: true,
        unique: true
    },
    read: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

center.plugin(uniqueValidator);

module.exports = mongoose.model('Center', center);