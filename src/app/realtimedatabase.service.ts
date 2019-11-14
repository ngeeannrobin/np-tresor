import { Injectable } from '@angular/core';
import { AngularFireObject } from "@angular/fire/database";
import { reject } from 'q';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
// THIS SERVICE USES FIRESTORE, NOT REALTIME DATABASE!!!
export class RealtimedatabaseService {

  ref: AngularFireObject<{}>;
  constructor(
    private db: AngularFirestore
    ) { }


  GetRequest(doc): Promise<any>{
    return new Promise(resolve => {
      doc.valueChanges().subscribe(
        data => { 
          resolve(data);
        },
        err => {
          reject(err);
        }
      )
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
            sortedQuest.notdone.push(quest);
          }
        });
        res(sortedQuest);
      })
    })
    return promise;
  }

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

  Test() {
    let col = this.db.collection("quest").ref
    
    col.where("point","==",3).get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }
}
