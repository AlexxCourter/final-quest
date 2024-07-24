import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../inventory/item.model';
import { ItemService } from '../inventory/item.service';
import { Equipped } from '../shared/equipped.interface';
import { Subscription } from 'rxjs';
import { Player } from '../shared/player.model';
import { StatService } from '../shared/stat.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, OnDestroy {
  equipped: Equipped = {weapon: null, armor: null, trinket: null};
  player: Player = new Player('',0,0,0,0,0,0,0,0,0,0);
  nextLvlPercent: number = 0;
  nextLvlExp: number = 0;

  weaponId: string = '';
  armorId: string = '';
  trinketId: string = '';

  weaponImg: string = '';
  armorImg: string = '';
  trinketImg: string = '';

  subscription: Subscription = new Subscription();
  equipSub: Subscription = new Subscription();

  constructor(private itemService: ItemService, private statService: StatService){
    
  }

  ngOnInit(): void {
    this.player = this.statService.getPlayer();
    this.subscription = this.statService.playerChangedEvent.subscribe((player: Player) =>{
      this.player = player;
    })
    this.equipped = this.itemService.getEquipped();
    this.equipSub = this.itemService.equipmentChangedEvent.subscribe((equips: Equipped) => {
      this.equipped = equips;
    })

    this.equipped.weapon ? this.weaponId = this.equipped.weapon.id : '';
    this.equipped.armor ? this.armorId = this.equipped.armor.id : '';
    this.equipped.trinket ? this.trinketId = this.equipped.trinket.id : '';
    this.equipped.weapon ? this.weaponImg = this.itemService.getItemImg(this.weaponId) : this.weaponImg = '../../assets/images/weapon-ph.webp';
    this.equipped.armor ? this.armorImg = this.itemService.getItemImg(this.armorId) : this.armorImg = '../../assets/images/armor-ph.webp';
    this.equipped.trinket ? this.trinketImg = this.itemService.getItemImg(this.trinketId) : this.trinketImg = '../../assets/images/trinket-ph.webp';
    
    this.nextLvlPercent = this.statService.getLvlPercentage();
    this.nextLvlExp = this.statService.getNextLevel()[1];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.equipSub.unsubscribe();
  }
}
