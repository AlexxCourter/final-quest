const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: {type: String, required: true},
    level: {type: Number, required: true},
    exp: {type: Number, required: true},
    hp: {type: Number, required: true},
    maxHp: {type: Number, required: true},
    atk: {type: Number, required: true},
    def: {type: Number, required: true},
    spd: {type: Number, required: true},
    int: {type: Number, required: true},
    luck: {type: Number, required: true},
    gold: {type: Number, required: true}

});

module.exports = mongoose.model('Player', playerSchema);