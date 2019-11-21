import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-how2play',
  templateUrl: './how2play.component.html',
  styleUrls: ['./how2play.component.css']
})
export class How2playComponent implements OnInit {
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private gameService: GameService
  ) { }

  instructions:Array<any> = [
    {
      text: "Hello! Welcome to trésor! A treasure hunting game!",
      title: "Introduction",
      img: "../../assets/icons/default_icon-512x512.png"
    },
    {
      text: "We will provide you with quests near you to solve.",
      title: "Quests",
      img: "../../assets/image/tutorial/questlist.png"
    },
    {
      text: "Each quest rewards you with a different number of points.",
      title: "Points",
      img: "../../assets/image/tutorial/tutpoint.png"
    },
    {
      text: "You solve these quests by finding a QR code somewhere!",
      title: "Solving",
      img: "../../assets/image/tutorial/tutqr.png"
    },
    {
      text: "When you think you have found the QR code, tap on \"Solve\" to scan it!",
      title: "Scanning",
      img: "../../assets/image/tutorial/tutcan.png"
    },
    {
      text: "If you're stuck, take the hints! Keep in mind that you will receive less points when you take hints.",
      title: "Hints",
      img: "../../assets/image/tutorial/tuthint.png"
    }
  ]

  currentIndex = 0;
  nextIndex = 1; // can be -1 of currentIndex if user taps on previous
  animate = 0;
  ngOnInit() {}
  
  async next(dir){
    if (this.animate==0){
      if (this.currentIndex+dir < this.instructions.length && this.currentIndex+dir>=0){
        this.nextIndex = this.currentIndex + dir;
        this.animate = dir;
        await this.delay(500);
        this.currentIndex += dir;
        this.animate = 0;
      }
      else {
        if (this.currentIndex){
          this.gameService.SetTutorialDone(this.auth.GetUserId()).then(
            _ => {
              this.router.navigate(["/ViewQuest"]);
            }
          )
        }
      }
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}