import { Injectable } from '@angular/core';
import { AngularFireObject } from "@angular/fire/database";
import { reject } from 'q';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class RealtimedatabaseService {

  ref: AngularFireObject<{}>;
  constructor(
    private db: AngularFirestore
    ) { }


  GetRequest(doc): Promise<any>{
    return new Promise(resolve => {
      doc.valueChanges().subscribe(
        data => { 
          console.log(data);
          resolve(data);
        },
        err => {
          reject(err);
        }
      )
    })
  }

  FetchQuest(): Promise<any>{
    return this.GetRequest(this.db.collection("quest"));
  }

  FetchSingleQuest(id): Promise<any>{
    return this.GetRequest(this.db.doc(`quest/${id}`));
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
