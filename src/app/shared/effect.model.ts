import { NumberSymbol } from "@angular/common";

export class Effect {
    constructor(
        public parameter: string,
        public modifier: number,
        //positive is false when subtracting, true when adding the modifier
        public positive: boolean
    ){}
}