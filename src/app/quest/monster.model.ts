import { Item } from "../inventory/item.model";

export class Monster {
    constructor(
        public id: string,
        public name: string,
        public difficulty: number,
        public description: string,
        public hp: number,
        public atk: number,
        public def: number,
        public speed: number,
        public exp: number,
        public gold: number,
        public loot: Item[] | null
    ){}
}