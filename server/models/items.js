const mongoose = require('mongoose');

const effectSchema = mongoose.Schema({
    parameter: {type: String, required: true},
    modifier: {type: String, required: true},
    positive: {type: Boolean, required: true}
});

const itemSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    value: {type: Number, required: true},
    effect: [effectSchema]
});

module.exports = mongoose.model('Items', itemSchema);