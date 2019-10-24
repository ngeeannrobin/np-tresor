import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RealtimedatabaseService {

  ref: AngularFireObject<{}>;
  constructor(private db: AngularFireDatabase) { }

  GetRequest(path:string){
    this.ref = this.db.object(path);
    return new Promise(resolve => {
      this.ref.snapshotChanges().subscribe(
        action => {
          resolve(action.payload.val());
        },
        err => {
          console.log(err);
          reject(err);
        }
      )
    })
  }

  FetchQuest(): Promise<any>{
    return this.GetRequest("/quest");
  }

  FetchDifficulty(): Promise<any>{
    return this.GetRequest("/difficulty");
  }
}
