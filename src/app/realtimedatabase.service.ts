import { Injectable } from '@angular/core';
import { AngularFireObject } from "@angular/fire/database";
import { reject } from 'q';
import { AngularFirestore } from 'angularfire2/firestore';

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
    const allQuest = this.GetRequest(this.db.collection("quest"))
    const completedQuest = this.GetRequest(this.db.doc(`user/${uuid}`))
    const promise = new Promise((res,rej)=>{
      Promise.all([allQuest,completedQuest]).then(values=>{
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



        console.log(sortedQuest);
        res(sortedQuest);
      })
    })
    return promise;
  }

  FetchSingleQuest(id): Promise<any> {
    return this.GetRequest(this.db.doc(`quest/${id}`));
  }

  // FetchCompletedQuest(uid): Promise<any> {
  //   return this.GetRequest(this.db.doc(`user/${uid}/questCompleted`))
  // }

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
