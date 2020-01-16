import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(private appConfigService: AppConfigService) {
    // set location immediately
    this.setLocation();
  }

  beginLocationUpdate() {
    // set location every 5 mins (300s)
    interval(300).subscribe(() => this.setLocation());
  }

  setLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => { 
          this.appConfigService.UserLocationLatitude = position.coords.latitude;
          this.appConfigService.UserLocationLongitude = position.coords.longitude;
        }, (err) => {
          console.log(`Something went wrong. Error: ${err}`);
        });
    } else {
       console.log("No support for geolocation")
    }
  }

}
