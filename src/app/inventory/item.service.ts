import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { Effect } from '../shared/effect.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipped } from '../shared/equipped.interface';
import { StatService } from '../shared/stat.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];
  inventoryChangedEvent = new Subject<Item[]>();

  equipped: Equipped = {
    weapon: null,
    armor: null,
    trinket: null
  }
  equipmentChangedEvent = new Subject<Equipped>();

  constructor(private statService: StatService, private http: HttpClient) {
    this.getInventoryFromDB();
   }

  getItemById(id: string){
    let target: Item = new Item('','','','',0,null,false);
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

  getInventoryFromDB(){
    this.http.get('http://localhost:3000/inventory')
    .subscribe(
      (items: any) => {
        this.items = items['Items'];
        this.inventoryChangedEvent.next(this.getItems());
      }
    )
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
    this.deleteItem(item);
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

  toggleLock(item: Item): Item{
    let newItem = item;
    if(newItem.locked == true){
      newItem.locked = false;
    } else {
      newItem.locked = true;
    }
    return newItem;
  }

  onLockItem(item: Item){
    let newItem = this.toggleLock(item);
    this.updateItem(item, newItem);
  }

  onAddItem(item : Item){
    this.items.push(item);
    this.postItem(item);
  }

  onSellItem(id: string){
    let item = this.getItemById(id);
    this.statService.effectStat(new Effect('gold',item.value,true));

    this.deleteItem(item); //will also splice from current list.
  }

  postItem(newItem: Item){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post('http://localhost:3000/inventory', newItem, {headers: headers})
    .subscribe(
      ()=>{
        this.inventoryChangedEvent.next(this.getItems());
      }
    )
  }

  deleteItem(item: Item){
    let index = this.items.indexOf(item);
    if(index < 0){
      return;
    }
    this.http.delete('http://localhost:3000/inventory/' + item.id)
    .subscribe(
      ()=>{
        this.items.splice(index, 1);
        this.inventoryChangedEvent.next(this.getItems());
      }
    )
  }

  updateItem(item: Item, newItem: Item){
    let index = this.items.indexOf(item);
    if(index < 0){
      return;
    }
    newItem.id = item.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/inventory/' + item.id, newItem, {headers: headers})
    .subscribe(
      ()=>{
        this.items[index] = newItem;
        this.inventoryChangedEvent.next(this.getItems());
      }
    )
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
    effect: Effect[] | null,
    locked: boolean
  ): Item {
    //assign a new ID
    return new Item(String(this.getMaxId()),name,description,type,value,effect,locked)
  }
}
