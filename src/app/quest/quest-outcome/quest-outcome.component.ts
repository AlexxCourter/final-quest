
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
  direction: String = "";
  location: String = "";
  quest: Quest;
  continue = false;
  player: Player;
  equipment: Equipped;

  btnText: String = "Continue";

  constructor(private qs: QuestService, private statService: StatService, private itemService: ItemService, private router: Router, private route: ActivatedRoute){
    this.quest = this.qs.getRandomQuest();
    this.player = this.statService.getPlayer();
    this.equipment = this.itemService.getEquipped();
    //need to update the getrandomquest function to account for
    //locations.
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.direction = params['direction'];
      this.location = params['location'];
    });

    if(this.quest.questStat === "atk"){
      this.btnText = 'Attack';
    }
  }

  onQuest(){
    this.continue = true;
    
  }

  equipPlayer(){
    let equipList = [this.equipment.weapon, this.equipment.armor, this.equipment.trinket];
    equipList.forEach(equip => {
      equip?.effect?.forEach(eff => {
        switch(eff.parameter){
          case 'hp':
            if(eff.positive){
              this.player.hp += eff.modifier;
            } else {
              this.player.hp -= eff.modifier;
            }
            break;
          case 'atk':
            if(eff.positive){
              this.player.atk += eff.modifier;
            } else {
              this.player.atk -= eff.modifier;
            }
            break;
          case 'def':
            if(eff.positive){
              this.player.def += eff.modifier;
            } else {
              this.player.def -= eff.modifier;
            }
            break;
          case 'spd':
            if(eff.positive){
              this.player.spd += eff.modifier;
            } else {
              this.player.spd -= eff.modifier;
            }
            break;
          case 'int':
            if(eff.positive){
              this.player.int += eff.modifier;
            } else {
              this.player.int -= eff.modifier;
            }
            break;
          case 'luck':
            if(eff.positive){
              this.player.luck += eff.modifier;
            } else {
              this.player.luck -= eff.modifier;
            }
            break;
        }
      })
    })
  }
}
