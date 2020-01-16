import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private zone: NgZone,) { }

  GetUserId(){
    return this.auth.auth.currentUser!=null?this.auth.auth.currentUser.uid:undefined;
  }

  GetUserDisplayName() {
    return this.auth.auth.currentUser!=null?this.auth.auth.currentUser.displayName:"Player";
  }

  CheckLogin(): Promise<boolean>{
    return new Promise((res)=>{
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.zone.run(()=> {
            res(true);
          })
        }
        else {
          res(false);
        }
      })
    })

    
  }


}
