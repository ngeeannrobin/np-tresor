import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get QuestRangeInM() {
    if (!this.appConfig) { throw Error('Config file not loaded!'); }
    return this.appConfig.QuestRangeInM;
  }

  get UserLocationLatitude() {
    if (!this.appConfig) { throw Error('Config file not loaded!'); }
    return this.appConfig.UserLocation.Latitude;
  }

  set UserLocationLatitude(lat: number) {
    if (!this.appConfig) { throw Error('Config file not loaded!'); }
    this.appConfig.UserLocation.Latitude = lat;
  }

  get UserLocationLongitude() {
    if (!this.appConfig) { throw Error('Config file not loaded!'); }
    return this.appConfig.UserLocation.Longitude;
  }

  set UserLocationLongitude(lon: number) {
    if (!this.appConfig) { throw Error('Config file not loaded!'); }
    this.appConfig.UserLocation.Longitude = lon;
  }
}