import { Component, Input } from '@angular/core';
import { Quest } from '../../quest.model';

@Component({
  selector: 'app-result-handler',
  templateUrl: './result-handler.component.html',
  styleUrl: './result-handler.component.css'
})
export class ResultHandlerComponent {
  @Input() quest: Quest = new Quest('','',0,'','','','',null,null);

  diceRoll(sides: number){
    let min = 0;
    let max = sides;
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  }
}
