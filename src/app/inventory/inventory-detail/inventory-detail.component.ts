import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrl: './inventory-detail.component.css'
})
export class InventoryDetailComponent implements OnInit {
  @Input() selectedItem: Item = new Item('','','','',0,null,false);
  imgUrl: string = '';

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.selectedItem = this.itemService.getItemById(params['id']);
      this.imgUrl = this.itemService.getItemImg(params['id']);
    })
  }

  onUse(){
    if(["weapon", "armor", "trinket"].includes(this.selectedItem.type)){
      this.itemService.addEquip(this.selectedItem.id, this.selectedItem.type)
    } else if (this.selectedItem.type === "consumeable") {
      this.itemService.useConsumeable(this.selectedItem.id);
      this.router.navigate(['inventory']);
    }
  }

  onSell(){
    if(confirm('Are you sure you want to sell this item?')){
      this.itemService.onSellItem(this.selectedItem.id)
      this.router.navigate(['inventory']);
    } else {
      //do nothing
    }
  }

  onLock(){
    this.itemService.onLockItem(this.selectedItem);
  }
}
