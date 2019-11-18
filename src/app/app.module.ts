import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment, firebaseConfig} from '../environments/environment';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

// Components & Dialogs
import { CuriousUserComponent } from './curious-user/curious-user.component';
import { LoginComponent } from './login/login.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';

// AngularFire
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";

// QR Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';


// Initialize Firebase app
import * as firebase from 'firebase';
import { How2playComponent } from './how2play/how2play.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginComponent,
    SingleQuestComponent,
    ViewQuestComponent,
    CuriousUserComponent,
    How2playComponent,
    LeaderboardComponent
    
    // Dialogs
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),

    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,

    // AngularFire
    AngularFireAuthModule,
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
