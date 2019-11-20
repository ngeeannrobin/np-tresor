import { Component, NgZone, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService) {


    
    // // Bypass login if already authenticated
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     zone.run(() => {
    //       // get username
    //       this.gameService.FetchUsername(this.authService.GetUserId()).then(username=>{
    //         // check if username is initital value
    //         if (username=="Player"){
    //           // set uesrname
    //           this.gameService.SetUsername(this.authService.GetUserDisplayName(), this.authService.GetUserId()).then(_=>{
    //             // redirect upon completion
    //             router.navigate(["/ViewQuest"]);
    //           })
    //         } else {
    //           // redirect if username isnt initial value
    //           router.navigate(['/ViewQuest'])
    //         }
            
    //       })


          
    //     });
    //   } else {
    //     console.log("Invalid authentication attempt...");
    //   }
    // });


  }

  signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  ngOnInit() {
    this.authService.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.checkInitialUsername();
      }
    })
  }

  checkInitialUsername(){
    this.gameService.FetchUsername(this.authService.GetUserId()).then(username=>{
      if (username=="Player"){
        this.gameService.SetUsername(this.authService.GetUserDisplayName(),this.authService.GetUserId()).then(_=>{
          this.router.navigate(["ViewQuest"]);
        })
      } else {
        this.router.navigate(["/ViewQuest"]);
      }
    })
  }

}
