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

  constructor(private zone: NgZone,
              private router: Router,
              private gameService: GameService,
              private authService: AuthService,
              private routingStateService: RoutingStateService) {

    // if being redirected from oauth, keep progress spinner on
    if (routingStateService.getPreviousUrl() == undefined) this.displayProgressSpinner = true;

    // Bypass login if already authenticated
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        zone.run(() => {

          // stop spinner
          this.displayProgressSpinner = false;

          // get username
          this.gameService.FetchUsername(this.authService.GetUserId()).then(username=>{
            // check if username is initital value
            if (username=="Player"){
              // set uesrname
              this.gameService.SetUsername(this.authService.GetUserDisplayName(), this.authService.GetUserId()).then(_=>{
                // redirect upon completion
                router.navigate(["/ViewQuest"]);
              })
            } else {
              // redirect if username isnt initial value
              router.navigate(['/ViewQuest'])
            }
            
          })
          
        });
      } else {
        console.log("Invalid authentication attempt...");
      }
    });
  }

  signInWithGoogle() {
    // start spinner
    this.displayProgressSpinner = true;
  
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  ngOnInit() {
  }

}
