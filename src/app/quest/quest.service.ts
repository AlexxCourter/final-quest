import { Injectable } from '@angular/core';
import { Quest } from './quest.model';
import { StatService } from '../shared/stat.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  quests: Quest[] = [];

  constructor(private statService: StatService, private http: HttpClient) {
    this.getQuestsFromDB();
  }

  getQuestsFromDB(){
    this.http.get('http://localhost:3000/quest')
    .subscribe(
      (quest: any) => {
        this.quests = quest['Quests'];
      }
    )
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
