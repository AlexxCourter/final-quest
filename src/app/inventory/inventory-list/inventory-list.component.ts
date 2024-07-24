import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Effect } from '../../shared/effect.model';
import { ItemService } from '../item.service';
import { Subscription } from 'rxjs';
import { StatService } from '../../shared/stat.service';
import { Player } from '../../shared/player.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit, OnDestroy{
  inventory: Item[] = [];
  gold: Number = 0;
  subscription: Subscription = new Subscription();
  playerSub: Subscription = new Subscription();

  constructor(private itemService: ItemService, private statService: StatService){}

  ngOnInit(): void {
    this.inventory = this.itemService.getItems();
    this.subscription = this.itemService.inventoryChangedEvent.subscribe((items: Item[]) => {
      this.inventory = items;
    });
    this.gold = this.statService.getPlayer().gold;
    this.playerSub = this.statService.playerChangedEvent.subscribe((player: Player)=>{
      this.gold = player.gold;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.playerSub.unsubscribe();
  }

}
