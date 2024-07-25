import { Item } from "../inventory/item.model";
import { Effect } from "../shared/effect.model";
import { Quest } from "./quest.model";


export const QUESTLIST = [
    new Quest(
        "1", 
        "Bat Attack!", 
        22, 
        "Three giant bats swoop down from the trees!", 
        'forest', 
        "atk", 
        "You slayed the giant bats!", 
        "The bats have beaten you...", 
        [new Effect('gold',30,true), new Effect('exp',80,true)], 
        [new Effect('hp',15,false)],
        [new Item('','Bat Claw','The claw of a large bat monster','material',50,null,false)]
    ),
    new Quest(
        '2', 
        "Secret Treasure", 
        12, 
        "You see a chest that may be full of treasure, or it may be a trap!", 
        'dungeon', 
        "luck", 
        "You open the chest and find 20 Gold!", 
        "It was a trap! You lost 5 HP", 
        [new Effect('gold',20,true)], 
        [new Effect('hp',5,false)],
        null
    ),
    new Quest(
        "3", 
        "Persuasion", 
        18, 
        "You are stopped by a rogue. If you are slick enough, you may be able to talk your way out of this!", 
        'forest', 
        "int", 
        "You managed to convince the Rogue to carry on.", 
        "The Rogue isn't convinced! He attacks you and you lose 3 HP, and he steals 2 Gold", 
        null, 
        [new Effect('hp',3,false), new Effect('gold',2,false)],
        null
    ),
    new Quest(
        "4", 
        "Untapped Potential", 
        15, 
        "You stand before a glowing statue of a forgotten hero. You can feel its power. Will it overwhelm you, or unlock your potential when you reach out to touch it?", 
        'dungeon', 
        "int", 
        "The power flows through you and unlocks your hidden potential! You gain a wealth of ancient experience.", 
        "The power overwhelms you and shocks you, taking some of your health!", 
        [new Effect('exp',1000,true)], 
        [new Effect('hp',5,false)],
        null
    ),
    new Quest(
        "5",
        "Undead Encounter!",
        25,
        "You are confronted by 2 Skeletal Warriors.",
        "dungeon",
        "atk",
        "You deftly destroy the two undead Skeletal Warriors!",
        "You are bested by the ancient sword techniques of the skeletal warriors...",
        [new Effect('gold',200,true), new Effect('exp', 120, true)],
        [new Effect('hp',20,false)],
        [new Item('','Bone shard','A fragement of an undead warrior','material',100,null,false)]
    ),
    new Quest(
        "6",
        "Werewolf Attack!",
        25,
        "You are confronted by a Lupine Beast.",
        "forest",
        "atk",
        "After a swift dodge, you manage to land a critical strike and fell the werewolf!",
        "You have been defeated by the werewolf...",
        [new Effect('gold',200,true), new Effect('exp', 120, true)],
        [new Effect('hp',20,false)],
        [new Item('','wolf fang','the tooth of a wolf creature','material',125,null,false)]
    ),
    new Quest(
        "7",
        "Jump over the pit",
        16,
        "Ahead of you is a large pit. If you run fast enough, you may be able to jump over it.",
        "dungeon",
        "spd",
        "Your agility has saved you! You easily jump over the pit.",
        "You fall into the pit, taking some damage and now must climb out to continue...",
        null,
        [new Effect('hp',5,false)],
        null
    ),
    new Quest(
        "8",
        "Something is watching...",
        18,
        "While traveling through the forest you begin to feel like you are being watched. To your surprise, a strange feral creature of a dark blue color jumps down from the trees and attacks you!",
        "forest",
        "atk",
        "You have slain the stalker beast!",
        "You take critical damage from the stalker beast...",
        [new Effect('gold',150,true), new Effect('exp', 100, true)],
        [new Effect('hp',15,false)],
        [new Item('','Blue fur','the fur of the dreaded forest stalker beast','material',100,null,false)]
    ),
    new Quest(
        "9",
        "Dragon!!!",
        32,
        "You arrive in a large treasure room guarded by a terrifying dragon! If you slay it, the riches are yours... but if you fail, what may become of you?",
        "dungeon",
        "atk",
        "Incredible! You manage to throw your weapon into the Dragon's mouth just before it breathes fire. Your attack caused the breath attack to backfire and deal fatal damage to the deadly beast!",
        "The dragon obliterates your defenses...",
        [new Effect('gold',3000,true), new Effect('exp', 1000, true)],
        [new Effect('hp',50,false)],
        [new Item('','Dragon Sword','A formiddable two-handed sword that was forged in dragon fire','weapon',6000,[new Effect('atk',20,true)],false)]
    ),
    new Quest(
        "10",
        "Fork in the path",
        17,
        "You've come to a fork in the path. There is no telling which is the correct direction, so you decide to take a chance and choose a path at random.",
        "forest",
        "luck",
        "Lucky! You advanced through the forest, and found a small bag of coins on the ground.",
        "You end up a little lost and have to retrace your steps. Luck was not on your side this time.",
        [new Effect('gold',10,true)],
        null,
        null
    ),
  ];

