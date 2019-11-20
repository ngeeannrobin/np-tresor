import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { NumberFormatStyle, Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private location: Location
  ) { }

  ngOnInit() {
    var user = firebase.auth().currentUser;

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
    
  }

  goBack() {
    this.location.back();
  }

  signOut() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

}