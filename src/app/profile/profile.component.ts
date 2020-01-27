import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { UserService } from '../user.service';
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
    public userS: UserService,
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
        this.userS.GetUserPoints(this.id).then(pts => {
          this.total_points = pts;
        });
        this.userS.GetUserQuestsDoneCount(this.id).then(qd => {
          this.quests_completed = qd;
        });
      } else {
        this.router.navigate(["login"]);
      }
    })
    
  }

  goBack() {
    let url = this.routingStateService.getPreviousUrl();
    this.router.navigate([url||'login']);
  }

  signOut() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

  test() {
    this.router.navigate(['/Campaign/OpenHouse2020']);
  }
}
