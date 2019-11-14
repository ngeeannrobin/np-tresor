import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-single-quest',
  templateUrl: './single-quest.component.html',
  styleUrls: ['./single-quest.component.css'],
})
export class SingleQuestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameservice: GameService,
    private location: Location) { }

  loaded: boolean = false;zzzzzzzz
  questId: string;
  quest: any = {hint:{}};
  showCamera: boolean = false;
  showHint: boolean = true;
  object = Object;
  animate: number = 0; // -1 if closing camera, 1 if opening camera
  correct: boolean = undefined;
  showMessage: boolean = false;
  message: string = "";
  hintTaken: number = 0;
  hintAvailable: number = 0;
  pointAwarded: number = 0;
  

  ngOnInit() {
    this.questId = this.route.snapshot.paramMap.get("id");
    this.FetchQuest(this.questId);
  }

  InjectFakeHints(){
    this.quest.hint = {
      hint0: {text: "fake hint number zero"},
      hint1: {text: "fake hint number one"},
      hint2: {text: "fake hint number two"},
      hint3: {text: "fake hint number three"},
      hint4: {text: "fake hint number four"},
      hint5: {text: "fake hint number five"},
      hint6: {text: "fake hint number six"},
      hint7: {text: "fake hint number seven"},
      hint8: {text: "fake hint number eight"}
    }
  }

  // CheckPermission(){
  //   let scanner = new ZXingScannerComponent();
  //   scanner.askForPermission();
  // }

  FetchQuest(id){
    this.gameservice.FetchSingleQuest(id).then(
      quest => {
        this.quest = quest;
        this.hintAvailable = this.quest.hint.length - this.hintTaken;
        this.pointAwarded = this.quest.point;
        console.log(quest);
        // this.InjectFakeHints();  
      },
      err => {
        console.log(err);
      }
    )
  }

  TakeHint(){
    // console.log(this.quest.hint.length)
    if (this.hintTaken < this.quest.hint.length){
      this.pointAwarded -= this.quest.hint[this.hintTaken].point
      this.hintTaken += 1;
      this.hintAvailable = this.quest.hint.length - this.hintTaken;

    }
      
    // console.log(this.hintTaken)
  }


  async ToggleCamera(){
    if (this.animate==0){ //no animation playing
      if (this.showCamera){ // camera is open / hint is not showing
        this.animate = -1;
        this.showHint = true;
        await this.delay(500);
        this.showCamera = false;
      } else { // camera not open / hint is showing
        this.showCamera = true;
        this.animate = 1;
        await this.delay(500);
        this.showHint = false;
      }
      this.animate = 0;
    }
  }

  ScanCallback(qr_data){
    console.log(qr_data);
    this.ToggleCamera();
    if (this.CheckQR(qr_data)){
      this.message = "You got it! Tap anywhere to return back to quests!"
      this.correct = true;
    } else {
      this.message = "That's ain't it, chief! Tap anywhere to continue."
      this.correct = false;
    }
  }

  CheckQR(qr_data):boolean{
    return qr_data == this.quest.qr;
  }
  back(){
    this.location.back();
  }

  async dismiss(){
    console.log(this.animate)
    if (this.animate == 0){ // don't think need to check, but just in case
      if (this.correct){
        this.back();
      } else { // re-display hints and stuff
        this.animate = -1;
        this.showMessage = true;
        this.correct = undefined;
        await this.delay(500);
        this.showMessage = false;
        this.animate = 0;
      }
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}