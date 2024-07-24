const mongoose = require('mongoose');

//sub schemas
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
//main quest schema
const questSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    difficulty: {type: Number, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    questStat: {type: String, required: true},
    winText: {type: String, required: true},
    lossText: {type: String, required: true},
    winEffect: [effectSchema],
    loseEffect: [effectSchema],
    loot: [itemSchema]
});

module.exports = mongoose.model('Quests', questSchema);