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

  message: string = "";

  // redirec: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private routingStateService: RoutingStateService) {

    // if being redirected from oauth, keep progress spinner on
    if (routingStateService.getPreviousUrl() == undefined && !routingStateService.isFirstUrl()) this.displayProgressSpinner = true;

  }
  

  async signInWithGoogle() {
    await this.Delay(300);
    // start spinner
    this.displayProgressSpinner = true;
    this.authService.CheckLogin().then(loggedIn=>{
      if (!loggedIn){
        this.Checker();
        var provider = new firebase.auth.GoogleAuthProvider();
        this.message = "Google Pop-up opened."
        firebase.auth().signInWithPopup(provider).then(result => {
          this.message = "Checking authentication details..."
          this.authService.CheckLogin().then(loggedIn=>{
            if (loggedIn){
              this.redirect();
             
            } else {
              this.displayProgressSpinner = false;
              this.message = "Unknown error: Authentication failed."
            }
          })
        }, err=>{
          this.message=`Error: ${err.message}`;
          this.displayProgressSpinner = false;
        })
      } else {
        this.displayProgressSpinner = false;
      }
    }) 
  }


  async Checker(){
    while (true){
      await this.Delay(1000);
      this.authService.CheckLogin().then(loggedIn=>{
        if (loggedIn){
          this.redirect();
          
        }
      })
    }
  }

  async redirect(){
    this.message = "Redirecting...";
    // this.redirec = true;
    this.displayProgressSpinner = false;
    await this.Delay(300);
    this.router.navigate(["/MainMenu"]);
  }

  ngOnInit() {
    this.authService.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.redirect();
        this.message = "Redirecting..."; 
      }
    })
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
