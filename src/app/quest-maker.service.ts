import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
// import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuestMakerService {

  constructor(private fs: FirestoreService) {}

  CreateQuest(uuid,quest){
    const ref = this.fs.doc(`userCreation/${uuid}`).collection("quest").doc(quest.questId);

    console.log(ref.ref.path);

    return ref.set(quest);
  }
}
