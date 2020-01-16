import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { QuestService } from './quest.service';
import { CampaignService } from './campaign.service';


@Injectable({
  providedIn: 'root'
})

// storing all game methods here, easier to refactor in the future
export class GameService {

  constructor(
    public userS: UserService,
    public questS: QuestService,
    public campaignS: CampaignService
    ) { }


  // QUEST
  FetchQuest(uuid): Promise<any> {
    return this.questS.FetchQuest(uuid);

  }
  FetchSingleQuest(id,uuid): Promise<any> {
    return this.questS.FetchSingleQuest(id,uuid);
  }
  TakeHint(quest,uuid): Promise<any> {
    return this.questS.TakeHint(quest,uuid);
  }
  CompleteQuest(quest,uuid): Promise<any> {
    return this.questS.CompleteQuest(quest,uuid);
  }

  // LEADERBOARD
  FetchTop(n,uuid): Promise<any> {
    return this.userS.FetchTop(n,uuid);
  }

  FetchUsername(uuid): Promise<string> {
    return this.userS.FetchUsername(uuid);
  }
  SetUsername(username, uuid): Promise<void> {
    return this.userS.SetUsername(username, uuid);
  }

  // TUTORIAL
  FetchTutorialStatus(uuid): Promise<boolean> {
    return this.userS.FetchTutorialStatus(uuid);
  }

  SetTutorialDone(uuid): Promise<void> {
    return this.userS.SetTutorialDone(uuid);
  }

  // CAMPAIGN

  FetchSingleCampaign(id,uuid,isGuest): Promise<any> {
    return this.campaignS.FetchSingleCampaign(id,uuid,isGuest);
  }

  CompleteQuestCampaign(id,uuid,campaign): Promise<any>{
    return this.campaignS.CompleteQuestCampaign(id,uuid,campaign);
  }

  SaveCampaignData(id,uuid,data): Promise<void>{
    return this.campaignS.SaveCampaignData(id,uuid,data);
  }

}
