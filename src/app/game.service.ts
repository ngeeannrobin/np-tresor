import { Injectable } from '@angular/core';
import { RealtimedatabaseService } from './realtimedatabase.service';

@Injectable({
  providedIn: 'root'
})

// storing all game methods here, easier to refactor in the future
export class GameService {

  constructor(public db: RealtimedatabaseService) { }

  FetchQuest(uuid,mode="all"): Promise<any> {
    switch(mode){
      case "wander":
        return;
      case "campaign":
        return;
      case "all":
      default:
        return this.db.FetchQuest(uuid);
    }
  }
  FetchSingleQuest(id,uuid): Promise<any> {
    return this.db.FetchSingleQuest(id,uuid);
  }
  TakeHint(quest,uuid): Promise<any> {
    return this.db.TakeHint(quest,uuid);
  }
  CompleteQuest(quest,uuid): Promise<any> {
    return this.db.CompleteQuest(quest,uuid)
  }
}