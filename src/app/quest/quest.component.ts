import { Component } from '@angular/core';
import { StatService } from '../shared/stat.service';
import { ItemService } from '../inventory/item.service';
import { QuestService } from './quest.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.css'
})
export class QuestComponent {
  constructor(private qs: QuestService, private i: ItemService, private s: StatService){}
}
