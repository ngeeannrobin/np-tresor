import { Component, NgZone, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { RoutingStateService } from '../routing-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // indicates whether spinner should be activated
  displayProgressSpinner = false;

  // spinner features
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  // message: string = "Redirecting...";
  loggedIn:boolean = true;

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService,
    private routingStateService: RoutingStateService) {

    // if being redirected from oauth, keep progress spinner on
    if (routingStateService.getPreviousUrl() == undefined && !routingStateService.isFirstUrl()) this.displayProgressSpinner = true;

  }
  

  signInWithGoogle() {
    // start spinner
    this.displayProgressSpinner = true;

    if (!this.loggedIn){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.authService.CheckLogin().then(loggedIn=>{
          if (loggedIn){
            // stop spinner
            this.displayProgressSpinner = false;
            this.router.navigate(["/MainMenu"]);
          } else {
            this.loggedIn = false;
          }
        })
      });
    }
  }

  ngOnInit() {
    this.authService.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.router.navigate(["/MainMenu"]);
      } else {
        this.loggedIn = false;
      }
    })
  }

}
