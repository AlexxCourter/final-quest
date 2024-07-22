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
  @Input() selectedItem: Item = new Item('','','','',0,null);
  imgUrl: string = '';

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.selectedItem = this.itemService.getItemById(params['id']);
      this.imgUrl = this.itemService.getItemImg(params['id']);
    })
  }
}
