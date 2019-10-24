import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment, firebaseConfig} from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { ARComponent } from './ar/ar.component';
import { ViewAllQuestComponent } from './view-all-quest/view-all-quest.component';
import { ViewSingleQuestComponent } from './view-single-quest/view-single-quest.component';
import { ViewQuestComponent, QrCodeScannerDialog, ViewQuestMessageDialog } from './view-quest/view-quest.component';


// AngularMaterial
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
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
    AppComponent,
    ARComponent,
    ViewAllQuestComponent,
    ViewSingleQuestComponent,
    ViewQuestComponent,
    QrCodeScannerDialog,
    ViewQuestMessageDialog
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
    MatExpansionModule,
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
    QrCodeScannerDialog,
    ViewQuestMessageDialog
  ]
})
export class AppModule { }
