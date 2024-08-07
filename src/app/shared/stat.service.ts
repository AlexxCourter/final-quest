import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { Subject } from 'rxjs';
import { Effect } from './effect.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  player: Player = new Player('Alex',0,0,15,15,10,10,8,10,5,200);
  playerChangedEvent = new Subject<Player>();

  constructor(private http: HttpClient) { 
    this.getPlayerFromDB();
  }

  getPlayer(){
    let ps = JSON.stringify(this.player);
    let p: Player = JSON.parse(ps);
    return p;
  }

  getPlayerFromDB(){
    this.http.get('http://localhost:3000/stats')
    .subscribe(
      (player: any) => {
        this.player = player['playerData'][0];
        this.playerChangedEvent.next(this.getPlayer());
      }
    )
  }

  updatePlayer(){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/stats/' + this.player.name, this.player, {headers: headers})
    .subscribe(
      () => {
        this.playerChangedEvent.next(this.getPlayer());
      }
    )
  }

  levelUp(){
    this.player.level += 1;
    upgrades[this.player.level].forEach((eff: Effect) => {
      this.effectStat(eff);
    })
  }

  fillHp(){
    this.player.hp = this.player.maxHp;
    this.updatePlayer();
  }

  checkLevel(){
    let nextLvl = this.getNextLevel();
    if(this.player.exp >= nextLvl[1]){
      this.levelUp();
      //recursive check until player is correct level.
      this.checkLevel();
    }
    this.updatePlayer();
  }

  getLvlPercentage(){
    let nextLvl = this.getNextLevel();
    //x100 gives displayable percentage. It is parsed back to a number from string after applying toFixed to 1 decimal.
    return Number(((this.player.exp / nextLvl[1])*100).toFixed(1));
  }

  effectStat(effect: Effect){
    switch(effect.parameter){
      case 'exp':
        if(effect.positive){
          this.player.exp += Number(effect.modifier);
          this.checkLevel();
        }
        break;
      case 'hp':
        if(effect.positive){
          this.player.hp += Number(effect.modifier);
          if(this.player.hp > this.player.maxHp){
            this.player.hp = this.player.maxHp;
          }
        } else {
          this.player.hp -= Number(effect.modifier);
          if(this.player.hp < 0){
            this.player.hp = 0;
          }
        }
        break;
      case 'gold':
        if(effect.positive){
          this.player.gold += Number(effect.modifier);
        } else {
          this.player.gold -= Number(effect.modifier);
        }
        break;
      case 'atk':
        if(effect.positive){
          this.player.atk += Number(effect.modifier);
        } else {
          this.player.atk -= Number(effect.modifier);
        }
        break;
      case 'def':
        if(effect.positive){
          this.player.def += Number(effect.modifier);
        } else {
          this.player.def -= Number(effect.modifier);
        }
        break;
      case 'spd':
        if(effect.positive){
          this.player.spd += Number(effect.modifier);
        } else {
          this.player.spd -= Number(effect.modifier);
        }
        break;
      case 'maxHp':
        if(effect.positive){
          this.player.maxHp += Number(effect.modifier);
        } else {
          this.player.maxHp -= Number(effect.modifier);
        }
        break;
      case 'int':
        if(effect.positive){
          this.player.int += Number(effect.modifier);
        } else {
          this.player.int -= Number(effect.modifier);
        }
        break;
      case 'luck':
        if(effect.positive){
          this.player.luck += Number(effect.modifier);
        } else {
          this.player.luck -= Number(effect.modifier);
        }
        break;
    }
    this.updatePlayer();
  }

  getNextLevel(): number[] {
    let nextLvl = this.player.level + 1;
    let nextExp = levels[nextLvl];
    return [nextLvl, nextExp]
  }

}

type Level = Record<number, number>;
type Upgrade = Record<number, Effect[]>;

const levels: Level = {
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
  10: 1000,
  11: 1150,
  12: 1300,
  13: 1450,
  14: 1600,
  15: 1750,
  16: 1900,
  17: 2050,
  18: 2300,
  19: 2450,
  20: 2600,
  21: 2900,
  22: 3200,
  23: 3500,
  24: 3800,
  25: 4100,
  26: 4400,
  27: 4700,
  28: 5000,
  29: 5300,
  30: 5600,
  31: 6600,
  32: 7600,
  33: 8600,
  34: 9600,
  35: 10600,
  36: 11600,
  37: 12600,
  38: 13600,
  39: 14600,
  40: 15600,
}

const upgrades: Upgrade  = {
  1: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  2: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  3: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  4: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  5: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  6: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  7: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  8: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  9: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  10: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('luck',1,true)],
  11: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  12: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  13: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  14: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  15: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  16: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  17: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  18: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  19: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  20: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('luck',1,true)],
  21: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  22: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  23: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  24: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  25: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  26: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  27: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  28: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  29: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  30: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('luck',1,true)],
  31: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  32: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  33: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  34: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  35: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  36: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  37: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('def',1,true)],
  38: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('spd',1,true)],
  39: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('int',1,true)],
  40: [new Effect('maxHp',2,true), new Effect('atk',1,true), new Effect('luck',1,true)],
}
