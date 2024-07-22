import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { Subject } from 'rxjs';
import { Effect } from './effect.model';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  player: Player = new Player('Alex',5,500,12,20,14,11,8,10,5,500);
  playerChangedEvent = new Subject<Player>();

  constructor() { 

  }

  getPlayer(){
    let ps = JSON.stringify(this.player);
    let p: Player = JSON.parse(ps);
    return p;
  }

  levelUp(){
    this.player.level += 1;
    this.playerChangedEvent.next(this.player);
  }

  fillHp(){
    this.player.hp = this.player.maxHp;
    this.playerChangedEvent.next(this.player);
  }

  effectStat(effect: Effect){
    switch(effect.parameter){
      case 'exp':
        if(effect.positive){
          this.player.exp += effect.modifier;
        } else {
          this.player.exp -= effect.modifier;
        }
        break;
      case 'hp':
        if(effect.positive){
          this.player.hp += effect.modifier;
        } else {
          this.player.hp -= effect.modifier;
        }
        break;
      case 'gold':
        if(effect.positive){
          this.player.gold += effect.modifier;
        } else {
          this.player.gold -= effect.modifier;
        }
        break;
      case 'atk':
        if(effect.positive){
          this.player.atk += effect.modifier;
        } else {
          this.player.atk -= effect.modifier;
        }
        break;
      case 'def':
        if(effect.positive){
          this.player.def += effect.modifier;
        } else {
          this.player.def -= effect.modifier;
        }
        break;
      case 'spd':
        if(effect.positive){
          this.player.spd += effect.modifier;
        } else {
          this.player.spd -= effect.modifier;
        }
        break;
      case 'maxHp':
        if(effect.positive){
          this.player.maxHp += effect.modifier;
        } else {
          this.player.maxHp -= effect.modifier;
        }
        break;
    }
    this.playerChangedEvent.next(this.player);
  }

}
