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
    const campaignPublicPromise = this.fs.GetRequest(this.fs.doc(`campaignPublic/${id}`));
    const campaignQuestPromise = this.fs.GetRequest(this.fs.collection(`campaign/${id}/quest`))
    const campaignPublicQuestPromise = this.fs.GetRequest(this.fs.collection(`campaignPublic/${id}/quest`))
    const userCampaignDataPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`).collection("campaign").doc(id));
    
    let promise = new Promise((res,rej)=>{
      Promise.all([campaignPromise,campaignPublicPromise,campaignQuestPromise,campaignPublicQuestPromise]).then(values=>{
        let campaign = values[0] ? values[0] : values[1];
        let campaignQuest = values[2].length>0 ? values[2] : values[3];
        // inject quests
        console.log(campaignQuest);
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
        this.u.IncreaseField(uuid,"totalPoint",campaign.point);
        this.u.IncreaseField(uuid,"campaignCompleted",1);
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

  CampaignExist(id): Promise<boolean> {
    const campaignPromise = this.fs.GetRequest(this.fs.doc(`campaign/${id}`));
    const campaignPublicPromise = this.fs.GetRequest(this.fs.doc(`campaignPublic/${id}`));

    const promise = new Promise<boolean>((res,rej)=>{
      Promise.all([campaignPromise,campaignPublicPromise]).then(values=>{
        res(values[0]||values[1]?true:false);
      });
    });

    return promise;
  }

  private FilterEmptyString(arr: Array<string>){
    for (let i = arr.length-1; i >= 0; i--) {
      if (arr[i].trim() == "")
        arr.splice(i,1);
    }
    return arr;
  }

  private FilterEmptyQuest(arr){
    for (let i = arr.length-1; i >= 0; i--){
      if (arr[i].questData.title.trim()=="")
        arr.splice(i,1);
    }
  }

  CreateCampaign(campaign,uuid): Promise<void> {
    let campaignToPush:any = {};
    campaignToPush.backStory = this.FilterEmptyString(campaign.backStory);
    campaignToPush.endText = this.FilterEmptyString(campaign.endText);
    campaignToPush.introText = this.FilterEmptyString(campaign.introText);
    campaignToPush.title = campaign.title;

    this.FilterEmptyQuest(campaign.quest);

    campaignToPush.startQuest = "q0";
    campaignToPush.endQuest = `q${campaign.quest.length-1}`;
    campaignToPush.point = 0;
    campaign.createdBy = uuid;

    const promiseArray = [];
    promiseArray.push(this.fs.collection(`campaignPublic`).doc(campaign.id).set(campaignToPush));

    const ref = this.fs.collection(`campaignPublic`).doc(campaign.id).collection("quest");
    for (let i = 0; i < campaign.quest.length; i++) {
      campaign.quest[i].id = `q${i}`;
      campaign.quest[i].nextQuest = i+1<campaign.quest.length?`q${i+1}`:null;
      promiseArray.push(ref.doc(`q${i}`).set(campaign.quest[i]));
    }


    const promise = new Promise<void>((res,rej)=>{
      Promise.all(promiseArray).then(_=>{
        res();
      })
    });

    return promise;
  }

  

}
