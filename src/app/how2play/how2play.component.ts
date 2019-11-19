import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how2play',
  templateUrl: './how2play.component.html',
  styleUrls: ['./how2play.component.css']
})
export class How2playComponent implements OnInit {
  
  constructor() { }

  instructions:Array<any> = [
    {
      text: "Hello! Welcome to trésor! A tresure hunting game!",
      title: "Introduction",
      img: "../../assets/icons/default_icon-512x512.png"
    },
    {
      text: "We will provide you with quests near you to solve.",
      title: "Quests",
      img: "../../assets/image/tutorial/questlist.png"
    },
    {
      text: "Each quest rewards you with a different number of points (we have a leaderboard, GO! GO! GO!).",
      title: "Points",
      img: "../../assets/image/tutorial/tutpoint.png"
    },
    {
      text: "You solve these quests by trying to find a QR code somewhere in real life!",
      title: "Solving",
      // img: "../../assets/image/tutorial/tuthint.png"
    },
    {
      text: "When you think you have found the QR code, tap on \"Solve\" to scan it!",
      title: "Scanning"
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
    console.log(this.currentIndex);
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
          console.log("redirect!")
        }
      }
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}