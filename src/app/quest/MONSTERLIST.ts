import { Item } from "../inventory/item.model";
import { Monster } from "./monster.model";

export const MONSTERLIST: Monster[] = [
    {
        id: '1',
        name: 'giant bat',
        difficulty: 1,
        description: "A large bat, thirsty for violence",
        hp: 10,
        atk: 3,
        def: 1,
        speed: 5,
        exp: 15,
        gold: 1,
        loot: null
    },

    {
        id: '2',
        name: 'wild bear',
        difficulty: 3,
        description: "A large bear, thirsty for violence",
        hp: 22,
        atk: 6,
        def: 3,
        speed: 5,
        exp: 30,
        gold: 5,
        loot: null
    },

    {
        id: '3',
        name: 'Risen Skeleton Warrior',
        difficulty: 3,
        description: "An undead skeletal warrior from ages past",
        hp: 13,
        atk: 8,
        def: 5,
        speed: 3,
        exp: 40,
        gold: 10,
        loot: [new Item('101','bone fragment','a piece of necromantic bone','material',4,null)]
    },

    {
        id: '4',
        name: 'Lupine Beast',
        difficulty: 4,
        description: "Like a werewolf, but twice as feral",
        hp: 15,
        atk: 10,
        def: 5,
        speed: 7,
        exp: 80,
        gold: 25,
        loot: [new Item('102','wolf fang','the tooth of a wolf creature','material',6,null)]
    },
]