import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(
    private gameservice: GameService,
    private auth: AuthService,
    private router: Router,
  ) { }

  top: any = {};
  uuid: string;

  ngOnInit() {
    this.auth.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.uuid = this.auth.GetUserId();
        this.FetchTop();
      } else {
        this.router.navigate(["login"]);
        
      }
    })
  }

  FetchTop(n=20){
    this.gameservice.FetchTop(n,this.uuid).then(
      top=>{
        this.top = top;
        console.log(top);
      },
      err => {
        console.log(err);
      }
    )
  }

}
