import { Injectable } from '@angular/core';
import { RealtimedatabaseService } from './realtimedatabase.service';

@Injectable({
  providedIn: 'root'
})

// storing all game methods here, easier to refactor in the future
export class GameService {

  constructor(public db: RealtimedatabaseService) { }

  FetchQuest(): Promise<any>{
    return this.db.FetchQuest();
  }

  FetchSingleQuest(id): Promise<any>{
    return this.db.FetchSingleQuest(id);
  }
}
