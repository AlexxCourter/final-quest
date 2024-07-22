import { Injectable } from '@angular/core';
import { Quest } from './quest.model';
import { Effect } from '../shared/effect.model';
import { StatService } from '../shared/stat.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  quests: Quest[] = [];

  tests = [
    new Quest("1", "Bat Attack!", 2, "Three giant bats swoop down from the trees!", "atk", "You slayed the giant bats!", "The bats have beaten you...", null, null),
    new Quest('2', "Secret Treasure", 4, "You see a chest that may be full of treasure, or it may be a trap!", "luck", "You open the chest and find 20 Gold!", "It was a trap! You lost 5 HP", [new Effect('gold',20,true)], [new Effect('hp',5,false)]),
    new Quest("3", "Persuasion", 2, "You are stopped by a rogue. If you are slick enough, you may be able to talk your way out of this!", "int", "You managed to convince the Rogue to carry on.", "The Rogue isn't convinced! He attacks you and you lose 3 HP, and he steals 2 Gold", null, [new Effect('hp',3,false), new Effect('gold',2,false)])
  ];

  constructor(statService: StatService) {
    //remove after testing
    this.quests = this.tests;
   }

  getRandomQuest(): Quest {
    let min = 0;
    let max = this.quests.length -1;
    let index = Math.floor(Math.random() * (max - min + 1)) + min;
    let quest: Quest = this.quests[index];
    return quest;
  }
}
