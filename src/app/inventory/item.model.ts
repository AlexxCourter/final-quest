import { Effect } from "../shared/effect.model";

export class Item {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public type: string,
        public value: number,
        public effect: Effect[] | null,
        public locked: boolean
    ){}
}