import { Component } from '@angular/core';
import { BrowserService } from './browser.service';
import { RoutingStateService } from './routing-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = 'Snapshot 19w05De';
  dark: boolean = false;

  constructor(
    private browserService: BrowserService,
    private routingStateService: RoutingStateService) {

    // begin updating location
    browserService.beginLocationUpdate();

    // begin updating navigation
    routingStateService.loadRouting();

  }

  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;
  }

}
