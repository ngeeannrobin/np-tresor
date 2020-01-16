import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: FirestoreService) { }

  
  private FetchUser(uuid): Promise<any> {
    const userPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`));
    return userPromise;
  }

  AwardPoint(point,uuid): Promise<any> {
    let userRef = this.fs.doc(`user/${uuid}`);
    return userRef.update({totalPoint: firestore.FieldValue.increment(point)});
  }


  GetUserPoints(uuid): Promise<any> {
    const userPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`));
    const promise = new Promise((res, rej) => {
      Promise.all([userPromise]).then(values => { res(values[0].totalPoint); })
    });

    return promise;
  }

  GetUserQuestsDoneCount(uuid): Promise<any> {
    const userPromise = this.fs.GetRequest(this.fs.doc(`user/${uuid}`));
    const promise = new Promise((res, rej) => {
      userPromise.then(userData=>{
        userData = userData || {};
        res(userData.questCompleted || 0)
      })
    });
    return promise;
  }

  // Profile
  FetchUsername(uuid): Promise<string> {
    console.log(uuid);
    return new Promise((res,rej)=>{
      this.FetchUser(uuid).then(userdoc => {
        res(userdoc.username);
      })
    })
  }
  SetUsername(username, uuid): Promise<void> {
    let userRef = this.fs.doc(`user/${uuid}`);
    return userRef.set({username: username},{merge: true});
  }

  // tutorial
  FetchTutorialStatus(uuid): Promise<boolean> {
    return new Promise((res,rej)=>{
      this.FetchUser(uuid).then(userdoc => {
        userdoc = userdoc || {};
        res(userdoc.tutorial || false);
      })
    })
  }

  SetTutorialDone(uuid): Promise<void> {
    let userRef = this.fs.doc(`user/${uuid}`);
    return userRef.set({tutorial: true},{merge:true});
  }

  FetchTop(n,uuid): Promise<any> {
    const ref = this.fs.collection("user").ref.orderBy("totalPoint").limitToLast(n);
    const topPromise = this.fs.GetRequestByRef(ref);
    // const userPromise = this.FetchUser(uuid);

    const promise = new Promise((res,rej)=>{
      Promise.all([topPromise]).then(values=>{
      // Promise.all([topPromise,userPromise]).then(values=>{
        res(values[0]);
      })
    })

    return promise;
  }

}
