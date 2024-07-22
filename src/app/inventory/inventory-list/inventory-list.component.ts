import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Effect } from '../../shared/effect.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit{
  inventory: Item[] = [];
  gold: Number = 0;

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    this.inventory = this.itemService.items;
  }

}
