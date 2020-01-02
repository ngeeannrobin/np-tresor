import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { NumberFormatStyle } from '@angular/common';
import { Router } from '@angular/router';
import { RoutingStateService } from '../routing-state.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  photoUrl:string;
  name:string;
  email:string;
  id:string;

  total_points:number;
  quests_completed:NumberFormatStyle;

  defaultPhotoUrl = "../../assets/image/default_avatar.png";

  constructor(
    public db: RealtimedatabaseService,
    private router: Router,
    private routingStateService: RoutingStateService,
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.auth.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        let user = firebase.auth().currentUser;
        if (user != null) {
          this.name = user.displayName;
          this.email = user.email;
          this.photoUrl = user.photoURL;
          this.id = user.uid;
        }
        this.db.GetUserPoints(this.id).then(pts => {
          this.total_points = pts;
        });
        this.db.GetUserCompleteQuests(this.id).then(quests => {
          this.quests_completed = quests.length;
        });
      } else {
        this.router.navigate(["login"]);
      }
    })
    
  }

  goBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }

  signOut() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

  tut() {
    this.router.navigate(['/Campaign/Tutorial']);
  }
}
