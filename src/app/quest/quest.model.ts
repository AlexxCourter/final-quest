import { Item } from "../inventory/item.model";
import { Effect } from "../shared/effect.model";

export class Quest {
    constructor(
        public id: string,
        public name: string,
        public difficulty: number,
        public description: string,
        public location: string,
        public questStat: string,
        public winText: string,
        public lossText: string,
        public winEffect: Effect[] | null,
        public loseEffect: Effect[] | null,
        public loot: Item[] | null
    ){}
}