import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AppConfigService } from './app-config.service';
import { HaversineService } from 'ng2-haversine';
import { UserService } from './user.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private fs: FirestoreService,
    private u: UserService,
    private appConfigService: AppConfigService,
    private haversineService: HaversineService
  ) { }

  FetchQuest(uuid): Promise<any> {
    const allQuestPromise = this.fs.GetRequest(this.fs.collection("quest"));
    const userDataPromise = this.fs.GetRequest(this.fs.collection(`user/${uuid}/quest`));
    const promise = new Promise((res,rej)=>{
      Promise.all([allQuestPromise,userDataPromise]).then(values=>{
        const allQuest = values[0];
        const userData = values[1];

        const userQuestData = {};
        userData.forEach(quest => {
          userQuestData[quest.id] = {};
          userQuestData[quest.id].completed = quest.completed;
          userQuestData[quest.id].hintTaken = quest.hintTaken;
        });

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

          userQuestData[quest.questId] = userQuestData[quest.questId] || {};
          // subtract hints taken by user from the total number of hints available
          quest.availHintCount -= userQuestData[quest.questId].hintTaken || 0;
          // sort quests by done/notdone
          if (userQuestData[quest.questId].completed || false){
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
    const questPromise = this.fs.GetRequest(this.fs.doc(`quest/${id}`));
    const userDataPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`).collection("quest").doc(id));
    const promise = new Promise((res,rej)=>{
      Promise.all([questPromise,userDataPromise]).then(values=>{
        const quest = values[0];
        const userData = values[1] || {};
        if (userData.completed){
          res(null);
        } else {
          const hintTakenCount = userData.hintTaken || 0;
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
    const userRef = this.fs.doc(`user/${uuid}`).collection("quest").doc(quest.questId);
    const obj = {hintTaken: firestore.FieldValue.increment(1),id: quest.questId}
    return userRef.set(obj, {merge:true})
  }

  private QuestDone(questId,uuid): Promise<any> {
    const userRef = this.fs.doc(`user/${uuid}`).collection("quest").doc(questId);
    const obj = {completed: true, id:questId}
    return userRef.set(obj, {merge:true});
  }

  CompleteQuest(quest,uuid): Promise<any> {
    const awardPointPromise =  this.u.IncreaseField(uuid,"totalPoint",quest.point);;
    const questDonePromise = this.QuestDone(quest.questId,uuid);
    const increaseQCPromise = this.u.IncreaseField(uuid,"questCompleted",1);
    const promise = new Promise((res,rej)=>{
      Promise.all([awardPointPromise,questDonePromise,increaseQCPromise]).then(
        values=>{
          res(true);
        },err=>{
          rej(err)
        }
      )
    })
    return promise;
  }

}
