import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { Effect } from '../shared/effect.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipped } from '../shared/equipped.interface';
import { StatService } from '../shared/stat.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [
    new Item('0','sword','a sharp blade for combat','weapon',10,[new Effect('atk',4,true)]),
    new Item('1','Steel Armor','A defensive suit of steel armor','armor',100,[new Effect('def',4,true)]),
    new Item('2','HP Potion','A magical elixir that heals 10 HP','consumeable',10,[new Effect('hp',10,true)]),
    new Item('3','Bat Claw','The claw of a large bat monster','material',50,null),
    new Item('4','Resonant Crystal','A glowing crystal that also produces an audible hum','material',500,null),
  ];
  inventoryChangedEvent = new Subject<Item[]>();

  equipped: Equipped = {
    weapon: null,
    armor: null,
    trinket: null
  }
  equipmentChangedEvent = new Subject<Equipped>();

  constructor(private statService: StatService) { }

  getItemById(id: string){
    let target: Item = new Item('','','','',0,null);
    this.items.forEach(item =>{
      if(item.id === id){
        target = item;
      }
    })
    return target;
  }

  getItems(){
    return this.items.slice();
  }

  getEquipped(){
    let e = JSON.stringify(this.equipped);
    let eq: Equipped = JSON.parse(e);
    return eq;
  }

  getEquipmentId(slot: string){
    let item;
    switch(slot){
      case 'weapon':
        item = this.equipped.weapon;
        break;
      case 'armor':
        item = this.equipped.armor;
        break;
      case 'trinket':
        item = this.equipped.trinket;
        break;
      default:
        return '-1';
    }

    if(item){
      return item.id;
    }
    return "-1";
  }

  addEquip(id: string, slot: string){
    let item = this.getItemById(id);
    switch(slot){
      case 'weapon':
        this.equipped['weapon'] = item;
        break;
      case 'armor':
        this.equipped['armor'] = item;
        break;
      case 'trinket':
        this.equipped['trinket'] = item;
        break;
    }
    this.equipmentChangedEvent.next(this.equipped);
  }

  useConsumeable(id: string){
    let item = this.getItemById(id);
    item.effect?.forEach(eff => {
      this.statService.effectStat(eff);
    })
    this.items.splice(this.items.indexOf(item),1);
    this.inventoryChangedEvent.next(this.items.slice());
  }

  getItemImg(id: string){
    let item = this.getItemById(id);
    switch(item.type){
      case 'weapon':
        return '../../assets/images/sword.jpg';
      case 'armor':
        return '../../assets/images/item-armor.webp';
      case 'material':
        return '../../assets/images/item-material.webp';
      case 'consumeable':
        return '../../assets/images/item-consumeable.webp';
    }
    return '../../assets/images/item-default.webp';
  }

  onAddItem(item : Item){
    this.items.push(item);
    this.inventoryChangedEvent.next(this.items.slice());
  }

  onSellItem(id: string){
    let item = this.getItemById(id);
    this.items.splice(this.items.indexOf(item),1);
    this.statService.effectStat(new Effect('gold',item.value,true));

    this.inventoryChangedEvent.next(this.items.slice());
  }


  getMaxId(): number {
    let maxId = 0;
    this.items.forEach(item => {
      let currentId = Number(item.id)
      if (currentId > maxId){
        maxId = currentId;
      }
    })
    return maxId +1;
   }

  itemFactory(
    name: string,
    description: string,
    type: string,
    value: number,
    effect: Effect[] | null
  ): Item {
    //assign a new ID
    return new Item(String(this.getMaxId()),name,description,type,value,effect)
  }
}
