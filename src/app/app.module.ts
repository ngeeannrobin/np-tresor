import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment, firebaseConfig} from '../environments/environment';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

// Components & Dialogs
import { CuriousUserComponent } from './curious-user/curious-user.component';
import { How2playComponent } from './how2play/how2play.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';

// AngularFire
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";

// QR Code Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// For spinner
import { AppOverlayModule } from './overlay/overlay.module';
import { ProgressSpinnerModule, ProgressSpinnerComponent } from './progress-spinner/progress-spinner.module';

// Http modules
import { HttpClientModule } from '@angular/common/http';

// To calculate distance between 2 points
import { HaversineService } from "ng2-haversine";


// Initialize Firebase app
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

import { AppConfigService } from './app-config.service';
import { CampaignMapComponent } from './campaign-map/campaign-map.component';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    CuriousUserComponent,
    How2playComponent,
    LeaderboardComponent,
    LoginComponent,
    NavBarComponent,
    ProfileComponent,
    SingleQuestComponent,
    ViewQuestComponent,
    CuriousUserComponent,
    CampaignMapComponent
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
    ZXingScannerModule,

    // Http
    HttpClientModule,

    // Spinner
    AppOverlayModule,
    ProgressSpinnerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => { return appConfigService.loadAppConfig(); };
      }
    },
    HaversineService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, ProgressSpinnerComponent]
})
export class AppModule { }
