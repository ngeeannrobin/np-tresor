import { Component, OnInit, Inject } from '@angular/core';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { Type } from '@angular/compiler';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-quest',
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.css']
})
export class ViewQuestComponent implements OnInit {

  constructor(
    private dbService: RealtimedatabaseService,
    private dialog: MatDialog) { }
  
  
  Object = Object;
  quests: any = {};
  difficulty: any = {};
  selectedQuestId: string = null;
  ngOnInit() {
    this.FetchDifficulty();
    this.FetchQuest();
  }

  FetchQuest(){
    this.dbService.FetchQuest().then(
      quest => {
        this.quests = quest;
      },
      err => {
        console.log(err);
      }
    )
  }

  FetchDifficulty(){
    this.dbService.FetchDifficulty().then(
      difficulty => {
        this.difficulty = difficulty;
      },
      err => {
        console.log(err);
      }
    )
  }

  popScanner(){
    console.log("test");
    const dialogRef = this.dialog.open(QrCodeScannerDialog, {
      // panelClass: "full-screen-dialog",
      // width: "50%",
      data: {}
    });

    //dialogRef.componentInstance.username = "";

    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
        // this.quests["quest999"] = {title: res, difficulty: 4};

        if (res == this.selectedQuestId){
          this.popMessage("Ayeeeeeeeee *insert meme*");
        }
        else{
          this.popMessage(`Wrong bodoh ${res}`);
        }
      }
    )
  }

  popMessage(message:string){
    const dialogRef = this.dialog.open(ViewQuestMessageDialog, {
      width: "50%",
      data: {msg: message}
    });
  }


}

@Component({
  selector: 'QrCodeScannerDialog',
  templateUrl: 'QrCodeScannerDialog.html',
  styleUrls: ['view-quest.component.css']
})
export class QrCodeScannerDialog {

  constructor(
    public dialogRef: MatDialogRef<QrCodeScannerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
  }


  test(event){
    this.dialogRef.close(event);
  }
}

@Component({
  selector: 'ViewQuestMessage',
  templateUrl: 'view-quest-message.dialog.html',
  styleUrls: ['view-quest.component.css']
})
export class ViewQuestMessageDialog {

  constructor(
    public dialogRef: MatDialogRef<ViewQuestMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    console.log(this.data);
  }
}