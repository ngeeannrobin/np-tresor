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
        if (result) {
          this.loggedIn = true;
          this.checkInitialUsername();
          this.displayProgressSpinner = false;
        } else {
          this.displayProgressSpinner = false;
        }
      });
    }
  }

  ngOnInit() {
    this.authService.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.checkInitialUsername();
      } else {
        this.loggedIn = false;
      }
    })
  }

  redirect(){
    this.router.navigate(["/ViewQuest"]);
  }

  checkInitialUsername(){
    this.gameService.FetchUsername(this.authService.GetUserId()).then(
      username=>{
        if (username=="Player"){
          this.gameService.SetUsername(this.authService.GetUserDisplayName(),this.authService.GetUserId()).then(_=>{
            this.redirect();
          })
        } else {
          this.redirect();
        }
      },
      err => {
        this.redirect();
      }
    )
  }

}
