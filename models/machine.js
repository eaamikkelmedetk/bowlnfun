/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machine = new Schema({
    machineNumber: {
        type: Number,
        required: true
    },
    state: String,
    centerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Center'
    }
});

module.exports = mongoose.model('Machine', machine);