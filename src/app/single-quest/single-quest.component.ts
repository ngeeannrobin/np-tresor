import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-single-quest',
  templateUrl: './single-quest.component.html',
  styleUrls: ['./single-quest.component.css'],
})
export class SingleQuestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private db: RealtimedatabaseService,
    private dialog: MatDialog,
    private location: Location) { }
  questId: string;
  quest: any = {};
  scanning: boolean = false;
  scanEffect: number = 0;

  ngOnInit() {
    this.questId = this.route.snapshot.paramMap.get("id");
    this.FetchQuest(this.questId);
    
  }

  CheckPermission(){
    let scanner = new ZXingScannerComponent();
    scanner.askForPermission();
  }

  FetchQuest(id){
    this.db.FetchSingleQuest(id).then(
      quest => {
        this.quest = quest;
      },
      err => {
        console.log(err);
      }
    )
  }


  // using two functions instead of toggling
  // in case user taps an even number of times.
  OpenCamera(){this.CheckPermission();this.scanning = true;}
  CloseCamera(){this.scanning = false;}

  ToggleScanLine(){this.scanEffect = (this.scanEffect + 1) % 4;}

  ScanCallback(qr_data){
    this.CloseCamera();
    if (this.CheckQR(qr_data)){
      this.popCongratsMessageDialog();
    } else {
      this.popMessageDialog("You wrong, you lose, so best think you haven't won.","");
    }
  }

  CheckQR(qr_data):boolean{
    return qr_data == this.questId;
  }

  popCongratsMessageDialog(){
    const dialogRef = this.popMessageDialog(
      "Congratulations! You did it! Yatta desu ne!",
      "(dismiss this to return to quest list)"
    );

    dialogRef.afterClosed().subscribe(
      res => {
        this.location.back();
      }
    )
  }

  popMessageDialog(message:string, submessage:string){
    const dialogRef = this.dialog.open(SingleQuestMessageDialog, {
      width: "75%",
      data: {msg: {main: message, sub: submessage}}
    });
    return dialogRef;
  }

}

// Message dialog; no functionalities
@Component({
  selector: 'SingleQuestMessage',
  templateUrl: 'single-quest-message.dialog.html',
  styleUrls: ['single-quest.component.css']
})
export class SingleQuestMessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}