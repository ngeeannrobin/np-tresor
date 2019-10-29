import { Component, OnInit, Inject } from '@angular/core';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-quest',
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.css']
})
export class ViewQuestComponent implements OnInit {

  constructor(
    private dbService: RealtimedatabaseService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  
  Object = Object;
  quests: any = {};
  difficulty: any = {};
  selectedQuestId: string = null;


  ngOnInit() {
    this.FetchDifficulty();
    this.FetchQuest();
  }

  openPage(id){
    
    console.log(`open page for questId: ${id}`);
    this.router.navigate([`/ViewQuest/${id}`])
  }

  // download quest table from firebase
  // TODO: Refactor this in the future
  // (player should only download relevant quests depending on gamemode)
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

  // download difficulty table from firebase
  // TODO: Remove this in the future
  // (player should not have access to difficulty table, only points given)
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

  RandInt(start,end){
    return Math.floor(Math.random() * (end-start) + start);
  }

  // open QR code scanner dialog
  popScanner(){

    // open the dialog, and keep the reference to said dialog.
    const dialogRef = this.dialog.open(QrCodeScannerDialog, {});

    // triggered when dialog is closed
    dialogRef.afterClosed().subscribe(
      res => {
        // res is the data passed by the dialog upon closing (should be a string reflecting the QR code)
        console.log(res);
        if (res == this.selectedQuestId){
          this.popMessage("Ayeeeeeeeee *insert meme*");
        }
        else{
          this.popMessage(`Wrong bodoh ${res}`);
        }
      }
    )
  }

  // Opens dialog to display message
  popMessage(message:string){
    const dialogRef = this.dialog.open(ViewQuestMessageDialog, {
      width: "50%",
      data: {msg: message}
    });
  }
}

// QR Scanner Dialog
@Component({
  selector: 'QrCodeScannerDialog',
  templateUrl: 'QrCodeScannerDialog.html',
  styleUrls: ['view-quest.component.css']
})
export class QrCodeScannerDialog {

  constructor(public dialogRef: MatDialogRef<QrCodeScannerDialog>) {}

  ngOnInit(){
    this.forceBackCamera();
  }

  // Called when camera reads a QR code.
  dataScanned(qrData){
    // close the dialog, pass the data to parent component.
    this.dialogRef.close(qrData);
  }

  // force the scanner to use back camera
  // hypothesis is that this will improve scanner load time
  forceBackCamera(){
    console.log("Force Back Camera method not implemented!");
  }
}

// Message dialog; no functionalities
@Component({
  selector: 'ViewQuestMessage',
  templateUrl: 'view-quest-message.dialog.html',
  styleUrls: ['view-quest.component.css']
})
export class ViewQuestMessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}