import { Component } from '@angular/core';
import { BrowserService } from './browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = 'Snapshot 19w05De';
  dark: boolean = false;

  constructor(private browserService: BrowserService) {
    // begin updating location
    browserService.beginLocationUpdate();
  }

  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;
  }

}
