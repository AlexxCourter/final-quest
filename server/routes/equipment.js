const Equips = require('../models/equipment')

class Equipment {
    weapon;
    armor;
    trinket;
    _id;
    Equips = Equips;

    constructor(){
        Equips.findOne()
        .then((equips) => {
            this.weapon = equips.weapon;
            this.armor = equips.armor;
            this.trinket = equips.trinket;
            this._id = equips._id;
        })
    }

    getEquips(){
        this.Equips.findOne()
        .then((equips) => {
            this.weapon = equips.weapon;
            this.armor = equips.armor;
            this.trinket = equips.trinket;
            this._id = equips._id;
        })
        return {weapon: this.weapon, armor: this.armor, trinket: this.trinket}
    }

    updateEquips(equipment){
        Equips.updateOne({_id: this._id}, {$set: equipment})
    }
}

module.exports = new Equipment();