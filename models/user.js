/**
 * Created by Marcus on 22-11-2016.
 */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var user = new Schema({
    name: {
        type: String,
        required: true,
        sparse: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    centerId: {
        type: Schema.Types.ObjectId,
        ref: "Center"
    },
    active: {
        type: Boolean,
        required: true
    }
});

user.plugin(uniqueValidator);

module.exports = mongoose.model('User', user);