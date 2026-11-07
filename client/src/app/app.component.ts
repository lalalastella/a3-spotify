import { Component } from '@angular/core';
import { AuthStateService } from './services/auth-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  constructor(public authState:AuthStateService) {
  }
}
