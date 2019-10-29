import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment, firebaseConfig} from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components & Dialogs
import { ViewQuestComponent, QrCodeScannerDialog, ViewQuestMessageDialog } from './view-quest/view-quest.component';
import { LoginComponent } from './login/login.component';
import { SingleQuestComponent, SingleQuestMessageDialog } from './single-quest/single-quest.component';

// AngularMaterial
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatListModule} from '@angular/material/list';


// AngularFire
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// QR Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { NgQrScannerModule } from 'angular2-qrscanner';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginComponent,
    SingleQuestComponent,
    ViewQuestComponent,
    
    // Dialogs
    QrCodeScannerDialog,
    SingleQuestMessageDialog,
    ViewQuestMessageDialog,
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),

    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    
    
    // AngularMaterial
    MatButtonModule,
    MatDialogModule,
    // MatExpansionModule,
    // MatListModule,

    // AngularFire
    AngularFireDatabaseModule,

    // QR Code Scanner
    ZXingScannerModule,
    // NgQrScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent],

  entryComponents: [
    // Dialogs
    QrCodeScannerDialog,
    SingleQuestMessageDialog,
    ViewQuestMessageDialog
  ]
})
export class AppModule { }
