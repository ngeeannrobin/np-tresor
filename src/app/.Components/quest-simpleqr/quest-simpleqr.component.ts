import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../../.Services/game.service';
import { AuthService } from '../../.Services/auth.service';
@Component({
  selector: 'quest-simpleqr',
  templateUrl: './quest-simpleqr.component.html',
  styleUrls: ['./quest-simpleqr.component.css']
})
export class QuestSimpleqrComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private gameservice: GameService,
    private location: Location,
    private router: Router) { }

  @Input() questName: string;
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  showCamera: boolean = false;
  correct: boolean = undefined;
  showMessage: boolean = false;
  message: string = "";
  userId: string = "";

  ngOnInit() {
    this.auth.CheckLogin().then(loggedIn => {
      if (loggedIn){
      }
    })
  }

  ToggleCamera(){
    this.showCamera = !this.showCamera;
  }

  ScanCallback(qr_data){
    this.ToggleCamera();
    if (this.CheckQR(qr_data)){
      this.message = "You got it! Tap anywhere to return back to campaign!"
      this.correct = true;
    } else {
      this.message = "That's ain't it, chief! Tap anywhere to continue."
      this.correct = false;
    }
    this.showMessage = true;
  }

  CheckQR(qr_data):boolean{
    return qr_data == this.quest.qr;
  }

  dismiss(){

    if (this.correct){
        this.emit({key:"solved"});
    } else { 
      this.correct=undefined;
      this.showMessage = false
    }

  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  emit(data){
    this.eventEmitter.emit(data);
  }



}