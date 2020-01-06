import { Injectable } from '@angular/core';
import { RealtimedatabaseService } from './realtimedatabase.service';

@Injectable({
  providedIn: 'root'
})
export class GameorganiserService {

  constructor(public db: RealtimedatabaseService) { }

  CreateCampaign(id,campaign){
    this.db.CreateCampaign(id,campaign);
  }
}
