import { Component, OnInit } from '@angular/core';
import { Item } from '../inventory/item.model';
import { ItemService } from '../inventory/item.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  weapon: Item | null;
  armor: Item | null;
  trinket: Item | null;

  weaponId: string = '';
  armorId: string = '';
  trinketId: string = '';

  weaponImg: string = '';
  armorImg: string = '';
  trinketImg: string = '';

  constructor(private itemService: ItemService){
    this.weapon = itemService.equipped['weapon'];
    this.armor = itemService.equipped['armor'];
    this.trinket = itemService.equipped['trinket'];

    //test
    this.weapon = itemService.getItemById('0');
    this.armor = itemService.getItemById('1');
  }

  ngOnInit(): void {
    this.weapon ? this.weaponId = this.weapon.id : '';
    this.armor ? this.armorId = this.armor.id : '';
    this.trinket ? this.trinketId = this.trinket.id : '';
    this.weapon ? this.weaponImg = this.itemService.getItemImg(this.weaponId) : this.weaponImg = '../../assets/images/weapon-ph.webp';
    this.armor ? this.armorImg = this.itemService.getItemImg(this.armorId) : this.armorImg = '../../assets/images/armor-ph.webp';
    this.trinket ? this.trinketImg = this.itemService.getItemImg(this.trinketId) : this.trinketImg = '../../assets/images/trinket-ph.webp';
  }
}
