import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-quest',
  templateUrl: './single-quest.component.html',
  styleUrls: ['./single-quest.component.css'],
})
export class SingleQuestComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private gameservice: GameService,
    private location: Location,
    private router: Router) { }

  loaded: boolean = false;
  questId: string;
  quest: any = {hint:{}};
  showCamera: boolean = false;
  showHint: boolean = true;
  object = Object;
  animate: number = 0; // -1 if closing camera, 1 if opening camera
  correct: boolean = undefined;
  showMessage: boolean = false;
  message: string = "";
  loadingHint: boolean = false;
  userId: string = "";
  awarding: boolean = false;
  // hintTaken: number = 0;
  // hintAvailable: number = 0;
  // pointAwarded: number = 0;
  

  ngOnInit() {
    this.userId = this.getUID();
    this.questId = this.route.snapshot.paramMap.get("id");
    this.FetchQuest(this.questId);
  }

  getUID(){
    const uid = this.auth.GetUserId();
    if (uid){
      return uid
    }
    this.router.navigate(["login"]);
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

  FetchQuest(id){
    this.gameservice.FetchSingleQuest(id,this.userId).then(
      quest => {
        this.quest = quest;
      },
      err => {
        console.log(err);
      }
    )
  }

  TakeHint(){
    if (this.quest.hintTakenCount < this.quest.hint.length && !this.loadingHint){
      this.loadingHint = true;
      this.gameservice.TakeHint(this.quest,this.userId).then(
        _ => {
          this.quest.point -= this.quest.hint[this.quest.hintTakenCount].point
          this.quest.hintTakenCount += 1;
          this.quest.hintAvailCount -= 1;
          this.loadingHint = false;
        },
        err=>{
          this.loadingHint = false;
          console.log(err);
        }
      )
    }
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
    if (this.animate == 0){ // don't think need to check, but just in case
      if (this.correct){
        if (!this.awarding){
          this.awarding = true;
          this.gameservice.CompleteQuest(this.quest, this.userId).then(_=>{
            this.back();
          })
        }
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