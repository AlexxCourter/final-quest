import { Component, Input, OnInit } from '@angular/core';
import { Quest } from '../../quest.model';
import { Player } from '../../../shared/player.model';
import { Effect } from '../../../shared/effect.model';
import { StatService } from '../../../shared/stat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../inventory/item.model';
import { ItemService } from '../../../inventory/item.service';

@Component({
  selector: 'app-result-handler',
  templateUrl: './result-handler.component.html',
  styleUrl: './result-handler.component.css'
})
export class ResultHandlerComponent implements OnInit {
  @Input() quest: Quest = new Quest('','',0,'','','','','',null,null,null);
  @Input() player: Player = new Player('',0,0,0,0,0,0,0,0,0,0);
  success: boolean = false;
  result: string = '';
  effects: Effect[] | null = [];
  loot: Item[] | null = null;

  constructor(private statService: StatService, private itemService: ItemService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.questResult();
    if(this.success){
      this.result = this.quest.winText;
      this.effects = this.quest.winEffect;
      this.loot = this.quest.loot;
    } else {
      this.result = this.quest.lossText;
      this.effects = this.quest.loseEffect;
    }
    if(this.effects){
      this.effects?.forEach(eff=>{
        this.statService.effectStat(eff);
      })
    }
    if(this.loot){
      this.loot.forEach(item =>{
        let newItem: Item = this.itemService.itemFactory(item.name,item.description,item.type,item.value,item.effect,item.locked);
        this.itemService.onAddItem(newItem);
      })
    }
  }

  diceRoll(sides: number){
    let min = 0;
    let max = sides;
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('rolled a ' + sides + ' sided die for: ' + result);
    return result;
  }

  questResult(){
    let questStat = this.getCorrectStat(this.quest.questStat);
    console.log("checking success against a difficulty of " + this.quest.difficulty + ".");
    console.log("player " + this.quest.questStat + " is: " + questStat);
    console.log('need a dice roll of ' + (this.quest.difficulty - questStat) + ' or higher to succeed.');
    if (questStat + this.diceRoll(20) >= this.quest.difficulty){
      this.success = true;
    }
  }

  getCorrectStat(stat: string){
    switch(stat){
      case 'hp':
        return this.player.hp;
        
      case 'atk':
        return this.player.atk;
        
      case 'def':
        return this.player.def;
        
      case 'spd':
        return this.player.spd;
        
      case 'luck':
        return this.player.luck;
        
      case 'int':
        return this.player.int;
    }
    return 0;
  }

  onContinue(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  //future implementation
  battleHandling(){}


}
