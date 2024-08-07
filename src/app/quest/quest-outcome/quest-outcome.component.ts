
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestService } from '../quest.service';
import { Quest } from '../quest.model';
import { StatService } from '../../shared/stat.service';
import { ItemService } from '../../inventory/item.service';
import { Player } from '../../shared/player.model';
import { Equipped } from '../../shared/equipped.interface';

@Component({
  selector: 'app-quest-outcome',
  templateUrl: './quest-outcome.component.html',
  styleUrl: './quest-outcome.component.css'
})
export class QuestOutcomeComponent implements OnInit {
  direction: string = "";
  location: string = "";
  quest: Quest = new Quest('','',0,'','','','','',null,null,null);
  continue = false;
  player: Player = new Player('',0,0,0,0,0,0,0,0,0,0);
  equipment: Equipped = {weapon: null, armor: null, trinket: null};

  btnText: string = "Continue";

  constructor(private qs: QuestService, private statService: StatService, private itemService: ItemService, private router: Router, private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.player = this.statService.getPlayer();
    this.equipment = this.itemService.getEquipped();
    this.route.params.subscribe(params =>{
      
      this.direction = params['direction'];
      this.location = params['location'];

      this.quest = this.qs.getRandomQuest(this.qs.getLocationList(this.location));
      
    });


    if(this.quest.questStat === "atk"){
      this.btnText = 'Attack';
    }
    
    this.equipPlayer();
  }

  onQuest(){
    this.continue = true;
    
  }

  onEscape(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  equipPlayer(){
    let equipList = [this.equipment.weapon, this.equipment.armor, this.equipment.trinket];
    equipList.forEach(equip => {
      equip?.effect?.forEach(eff => {
        switch(eff.parameter){
          case 'hp':
            if(eff.positive){
              this.player.hp += Number(eff.modifier);
            } else {
              this.player.hp -= Number(eff.modifier);
            }
            break;
          case 'atk':
            if(eff.positive){
              this.player.atk += Number(eff.modifier);
            } else {
              this.player.atk -= Number(eff.modifier);
            }
            break;
          case 'def':
            if(eff.positive){
              this.player.def += Number(eff.modifier);
            } else {
              this.player.def -= Number(eff.modifier);
            }
            break;
          case 'spd':
            if(eff.positive){
              this.player.spd += Number(eff.modifier);
            } else {
              this.player.spd -= Number(eff.modifier);
            }
            break;
          case 'int':
            if(eff.positive){
              this.player.int += Number(eff.modifier);
            } else {
              this.player.int -= Number(eff.modifier);
            }
            break;
          case 'luck':
            if(eff.positive){
              this.player.luck += Number(eff.modifier);
            } else {
              this.player.luck -= Number(eff.modifier);
            }
            break;
        }
      })
    })
  }
}
