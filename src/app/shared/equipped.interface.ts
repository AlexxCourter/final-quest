import { Item } from "../inventory/item.model";

export interface Equipped {
    weapon: Item | null,
    armor: Item | null,
    trinket: Item | null
  }