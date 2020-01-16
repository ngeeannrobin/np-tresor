import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(
    private fs: FirestoreService,
    private u: UserService) { }

  FetchSingleCampaign(id,uuid,isGuest): Promise<any> {
    const campaignPromise = this.fs.GetRequest(this.fs.doc(`campaign/${id}`));
    const campaignQuestPromise = this.fs.GetRequest(this.fs.collection(`campaign/${id}/quest`))
    const userCampaignDataPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`).collection("campaign").doc(id));
    
    let promise = new Promise((res,rej)=>{
      Promise.all([campaignPromise,campaignQuestPromise]).then(values=>{
        let campaign = values[0];
        let campaignQuest = values[1];
        // inject quests
        campaign.quest = {};
        campaignQuest.forEach(quest => {
          campaign.quest[quest.id] = quest;
        });
        // personalise campaign to user
        userCampaignDataPromise.then(userCampaignData=>{
          // inject data saved in user profile
          userCampaignData = userCampaignData || {};
          campaign.questCompleted = userCampaignData.questCompleted || 0;
          campaign.savedData = userCampaignData.savedData || {};
          campaign.completed = userCampaignData.completed || false;
          // mark quests as done
          let questId = campaign.startQuest;
          for (let i=0; i<userCampaignData.questCompleted; i-=-1){
            campaign.quest[questId].done = true;
            questId = campaign.quest[questId].nextQuest;
          }
          res(campaign);
        // probably guest mode
        },err=>{
          campaign.questCompleted = 0;
          campaign.savedData = {};
          campaign.completed = false;
          res(campaign);
        })
      })
    });
    return promise;
  }

  CompleteQuestCampaign(id,uuid,campaign): Promise<any> {
    let userCampaignRef = this.fs.doc(`user/${uuid}`).collection("campaign").doc(id);
    let obj:any = {};
    // reset savedData
    obj.savedData = {};
    // update questCompleted count
    obj.questCompleted = campaign.questCompleted;
    // campaign is complete
    if (campaign.questCompleted>=Object.keys(campaign.quest).length){
      // reset questCompleted
      obj.questCompleted = 0;
      // set completed to true
      obj.completed = true;
      // award points if first time completing
      if (!campaign.completed){
        this.u.AwardPoint(campaign.point,uuid);
      }
    }
    return userCampaignRef.set(obj,{merge: true});
  }

  SaveCampaignData(id,uuid,data): Promise<void> {
    let userCampaignRef = this.fs.doc(`user/${uuid}`).collection("campaign").doc(id);
    let obj:any = {};
    obj.savedData = data;
    return userCampaignRef.set(obj,{merge:true});
  }
}
