/**
 * Created by Morten on 15/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var error = new Schema({
    pins: [{
        10: {type: Boolean,required: true},
        1: {type: Boolean,required: true},
        2: {type: Boolean,required: true},
        3: {type: Boolean,required: true},
        4: {type: Boolean,required: true},
        5: {type: Boolean,required: true},
        6: {type: Boolean,required: true},
        7: {type: Boolean,required: true},
        8: {type: Boolean,required: true},
        9: {type: Boolean,required: true}
    }],
    type: String,
    timestamp: Date,
    machineId: {type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('Error', error);