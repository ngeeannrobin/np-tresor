import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';

@Component({
  selector: 'app-progress-spinner-demo',
  templateUrl: './progress-spinner-demo.component.html',
  styleUrls: ['./progress-spinner-demo.component.css']
})
export class ProgressSpinnerDemoComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  // Display progress spinner for 3 secs on click of button
  showProgressSpinner = () => {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3000);
  };
  showSpinnerWithoutBackdrop = () => {
    this.spinnerWithoutBackdrop = true;
    setTimeout(() => {
      this.spinnerWithoutBackdrop = false;
    }, 3000);
  };
}