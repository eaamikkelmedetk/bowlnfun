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
        unique: true,
        minlength: 1
    },
    read: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    active: {
        type: Boolean,
        required: true
    }
});

center.plugin(uniqueValidator);

module.exports = mongoose.model('Center', center);