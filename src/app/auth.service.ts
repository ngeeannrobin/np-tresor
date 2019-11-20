import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  GetUserId(){
    return this.auth.auth.currentUser!=null?this.auth.auth.currentUser.uid:undefined;
  }

  GetUserDisplayName() {
    return this.auth.auth.currentUser!=null?this.auth.auth.currentUser.displayName:"Player";
  }
}
