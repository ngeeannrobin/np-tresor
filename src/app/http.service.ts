import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // SetUsername(){
  //   this.http.post("https://us-central1-np-tresor.cloudfunctions.net/createUsername",null,null);
  // }
}
