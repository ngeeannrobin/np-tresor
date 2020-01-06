import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-gameorganiser',
  templateUrl: './gameorganiser.component.html',
  styleUrls: ['./gameorganiser.component.css']
})
export class GameorganiserComponent implements OnInit {
  constructor(
    private auth: AuthService) { }

  ngOnInit() {
    
  }

}
