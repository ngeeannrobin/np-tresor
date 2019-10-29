import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RealtimedatabaseService {

  ref: AngularFireObject<{}>;
  constructor(private db: AngularFireDatabase) { }

  // Generic method to pull data from firebase,
  // given a path to pull from.
  // Authentication is automatically handled by the library.
  GetRequest(path:string): Promise<any>{
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

  FetchSingleQuest(id): Promise<any>{
    return this.GetRequest(`/quest/${id}`)
  }

  FetchDifficulty(): Promise<any>{
    return this.GetRequest("/difficulty");
  }
}
