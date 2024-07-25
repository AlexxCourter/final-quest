const mongoose = require('mongoose');

const effectSchema = mongoose.Schema({
    parameter: {type: String, required: true},
    modifier: {type: Number, required: true},
    positive: {type: Boolean, required: true}
}, {_id: false});

const itemSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    value: {type: Number, required: true},
    effect: [effectSchema],
    locked: {type: Boolean, required: true}
});

module.exports = mongoose.model('Items', itemSchema);