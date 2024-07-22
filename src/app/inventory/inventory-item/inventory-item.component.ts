import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrl: './inventory-item.component.css'
})
export class InventoryItemComponent implements OnInit {
  @Input() item: Item = new Item('','','','',0,null);
  id: number = 0;
  imgUrl: string = "";
  equipped: boolean = false;

  constructor(private itemService: ItemService){
    
  }

  ngOnInit(): void {
    this.id = Number(this.item.id);
    this.imgUrl = this.itemService.getItemImg(String(this.id));

    if(this.item.id == this.itemService.getEquipmentId(this.item.type)){
      this.equipped = true;
    }
  }

  
}
