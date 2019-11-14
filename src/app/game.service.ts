import { Injectable } from '@angular/core';
import { RealtimedatabaseService } from './realtimedatabase.service';

@Injectable({
  providedIn: 'root'
})

// storing all game methods here, easier to refactor in the future
export class GameService {

  constructor(public db: RealtimedatabaseService) { }

  FetchQuest(uuid): Promise<any> {
    return this.db.FetchQuest(uuid);
  }
  FetchSingleQuest(id,uuid): Promise<any> {
    return this.db.FetchSingleQuest(id,uuid);
  }
  TakeHint(id,uuid,currentCount): Promise<any> {
    return this.db.TakeHint(id,uuid,currentCount);
  }
}
