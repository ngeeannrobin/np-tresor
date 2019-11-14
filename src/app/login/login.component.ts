import { Component, NgZone, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private zone: NgZone,
              private router: Router) {
    // Bypass login if already authenticated
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        zone.run(() => router.navigate(['/ViewQuest']));
      } else {
        console.log("Invalid authentication attempt...");
      }
    });
  }

  signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  ngOnInit() {
  }

}
