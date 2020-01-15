import { Injectable } from '@angular/core';
import { AngularFireObject } from "@angular/fire/database";
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';
import { AppConfigService } from './app-config.service';
import { HaversineService } from 'ng2-haversine';

@Injectable({
  providedIn: 'root'
})
// THIS SERVICE USES FIRESTORE, NOT REALTIME DATABASE!!!
export class RealtimedatabaseService {

  ref: AngularFireObject<{}>;
  constructor(
    private db: AngularFirestore,
    private appConfigService: AppConfigService,
    private haversineService: HaversineService
    ) { }


  GetRequest(doc): Promise<any>{
    return new Promise((res,rej) => {
      doc.valueChanges().subscribe(
        data => { 
          res(data);
        },
        err => {
          rej(err);
        }
      )
    })
  }

  GetRequestByRef(ref): Promise<any>{
    return new Promise((res,rej)=>{
      ref.get().then(snapshot=>{
        if (snapshot.empty) {
          res({}); 
        }
        let array = [];
        snapshot.forEach(doc => {
          array.unshift(doc.data());
        });
        res(array);
      })
    })
  }

  FetchQuest(uuid): Promise<any> {
    const allQuestPromise = this.GetRequest(this.db.collection("quest"));
    const userPromise = this.GetRequest(this.db.doc(`user/${uuid}`));
    const promise = new Promise((res,rej)=>{
      Promise.all([allQuestPromise,userPromise]).then(values=>{
        const allQuest = values[0];
        const questCompleted: Array<any> = values[1].questCompleted?values[1].questCompleted:[];
        const hintTaken: Array<any> = values[1].hintTaken?values[1].hintTaken:[];
        const sortedQuest = {done: [], notdone: []};
        
        // get features for filtering quests by range
        const quest_range = this.appConfigService.QuestRangeInM;
        const user_location = {
          latitude: this.appConfigService.UserLocationLatitude,
          longitude: this.appConfigService.UserLocationLongitude
        };
        allQuest.forEach(quest => {
          // inititalise available hint count to the number of hints available
          quest.availHintCount = quest.hint.length;
          // subtract hints taken by user from the total number of hints available
          if (hintTaken[quest.questId]){
            quest.availHintCount -= hintTaken[quest.questId];
          }
          // sort quests by done/notdone
          if (questCompleted.includes(quest.questId)){
            sortedQuest.done.push(quest);
          } else {
            // only include quests within quest_range in notdone
            if (user_location.latitude == null || user_location.longitude == null) {
              // if no location, show all quests
              sortedQuest.notdone.push(quest);
            } else {
              // get dist in m between quest & user
              const dist = this.haversineService.getDistanceInMeters(user_location, {
                latitude: quest.latitude,
                longitude: quest.longitude
              });

              // if distance is within defined range, show quest
              if (dist <= quest_range) { sortedQuest.notdone.push(quest); }
            }
          }
        });
        res(sortedQuest);
      })
    })
    return promise;
  }

  // Single Quest
  FetchSingleQuest(id,uuid): Promise<any> {
    const questPromise = this.GetRequest(this.db.doc(`quest/${id}`));
    const userPromise = this.GetRequest(this.db.doc(`user/${uuid}`));
    const promise = new Promise((res,rej)=>{
      Promise.all([questPromise,userPromise]).then(values=>{
        const completedQuest = values[1].questCompleted?values[1].questCompleted:[];
        if (completedQuest.includes(id)){
          res(null);
        } else {
          const quest = values[0];
          const hintTakenCount = values[1].hintTaken?(values[1].hintTaken[id]?values[1].hintTaken[id]:0):0;
          quest.hintAvailCount = quest.hint.length - hintTakenCount;
          quest.hintTakenCount = hintTakenCount;
          for (let i=0; i<hintTakenCount; i++){
            quest.point -= quest.hint[i].point;
          }
          res(quest);
        }
      })
    })
    return promise;
  }

  TakeHint(quest,uuid): Promise<any> {
    let userRef = this.db.doc(`user/${uuid}`);
    let obj = {};
    obj[quest.questId] = quest.hintTakenCount+1;
    return userRef.set({hintTaken: obj},{merge: true});
  }

  private AwardPoint(point,uuid): Promise<any> {
    let userRef = this.db.doc(`user/${uuid}`);
    return userRef.update({totalPoint: firestore.FieldValue.increment(point)});
  }

  private QuestDone(questId,uuid): Promise<any> {
    let userRef = this.db.doc(`user/${uuid}`);
    return userRef.update({questCompleted: firestore.FieldValue.arrayUnion(questId)});
  }

  CompleteQuest(quest,uuid): Promise<any> {
    const promise = new Promise((res,rej)=>{
      Promise.all([
        this.AwardPoint(quest.point,uuid),
        this.QuestDone(quest.questId,uuid)]).then(values=>{
          res(undefined);
      })
    })
    return promise;
  }

  private FetchUser(uuid): Promise<any> {
    const userPromise = this.GetRequest(this.db.doc(`user/${uuid}`));
    return userPromise;
  }

  // Leaderboard
  FetchTop(n,uuid): Promise<any> {
    const ref = this.db.collection("user").ref.orderBy("totalPoint").limitToLast(n);
    const topPromise = this.GetRequestByRef(ref);
    // const userPromise = this.FetchUser(uuid);

    const promise = new Promise((res,rej)=>{
      Promise.all([topPromise]).then(values=>{
      // Promise.all([topPromise,userPromise]).then(values=>{
        res(values[0]);
      })
    })

    return promise;
  }

  GetUserPoints(uuid): Promise<any> {
    const userPromise = this.GetRequest(this.db.doc(`user/${uuid}`));
    const promise = new Promise((res, rej) => {
      Promise.all([userPromise]).then(values => { res(values[0].totalPoint); })
    });

    return promise;
  }

  GetUserCompleteQuests(uuid): Promise<any> {
    const userPromise = this.GetRequest(this.db.doc(`user/${uuid}`));
    const promise = new Promise((res, rej) => {
      Promise.all([userPromise]).then(values => { res(values[0].questCompleted); })
    });

    return promise;
  }

  // Profile
  FetchUsername(uuid): Promise<string> {
    return new Promise((res,rej)=>{
      this.FetchUser(uuid).then(userdoc => {
        res(userdoc.username);
      })
    })
  }
  SetUsername(username, uuid): Promise<void> {
    let userRef = this.db.doc(`user/${uuid}`);
    return userRef.set({username: username},{merge: true});
  }

  // tutorial
  FetchTutorialStatus(uuid): Promise<boolean> {
    return new Promise((res,rej)=>{
      this.FetchUser(uuid).then(userdoc => {
        res(userdoc.tutorial);
      })
    })
  }

  SetTutorialDone(uuid): Promise<void> {
    let userRef = this.db.doc(`user/${uuid}`);
    return userRef.set({tutorial: true},{merge:true});
  }

  FetchSingleCampaign(id,uuid,isGuest): Promise<any> {
    const campaignPromise = this.GetRequest(this.db.doc(`campaign/${id}`));
    const campaignQuestPromise = this.GetRequest(this.db.collection(`campaign/${id}/quest`))
    const userCampaignDataPromise = this.GetRequest(this.db.doc(`userCampaignData/${uuid}`).collection("campaign").doc(id));
    
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
    let userCampaignRef = this.db.doc(`userCampaignData/${uuid}`).collection("campaign").doc(id);
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
        this.AwardPoint(campaign.point,uuid);
      }
    }
    
    return userCampaignRef.set(obj,{merge: true});
  }

  SaveCampaignData(id,uuid,data): Promise<void> {
    let userCampaignRef = this.db.doc(`userCampaignData/${uuid}`);
    let obj = {};
    obj[id] = {};
    obj[id].savedData = data;
    return userCampaignRef.set(obj,{merge:true});
  }



  CreateCampaign(id,campaign): Promise<any> {
    let campaignRef = this.db.doc(`campaign/${id}`);
    return campaignRef.set(campaign);
  }
}
