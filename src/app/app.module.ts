import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment, firebaseConfig} from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components & Dialogs
import { ViewQuestComponent } from './view-quest/view-quest.component';
import { LoginComponent } from './login/login.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';

// AngularMaterial
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


// AngularFire
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestore } from "angularfire2/firestore";

// QR Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CuriousUserComponent } from './curious-user/curious-user.component';
// import { NgQrScannerModule } from 'angular2-qrscanner'; (look into this if zxing cmi)

// Initialize Firebase app
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginComponent,
    SingleQuestComponent,
    ViewQuestComponent,
    CuriousUserComponent,
    
    // Dialogs
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),

    // Enable offline support
    AngularFirestoreModule.enablePersistence(),

    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    
    // AngularMaterial
    MatButtonModule,
    MatDialogModule,

    // AngularFire
    AngularFireDatabaseModule,

    // QR Code Scanner
    ZXingScannerModule
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    // Dialogs
  ]
})
export class AppModule { }
