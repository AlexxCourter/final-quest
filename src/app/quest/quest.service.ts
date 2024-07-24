import { Injectable } from '@angular/core';
import { Quest } from './quest.model';
import { Effect } from '../shared/effect.model';
import { StatService } from '../shared/stat.service';
import { QUESTLIST } from './QUESTLIST';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  quests: Quest[] = [];

  constructor(statService: StatService) {
    //remove after testing
    this.quests = QUESTLIST;

    
   }

  getLocationList(location: string){
        return this.quests.filter(q => q.location == location);
  }

  getRandomQuest(quests: Quest[]): Quest {
    let min = 0;
    let max = quests.length -1;
    let index = Math.floor(Math.random() * (max - min + 1)) + min;
    let quest: Quest = quests[index];
    return quest;
  }
}
