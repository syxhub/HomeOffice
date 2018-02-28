import { Component } from '@angular/core';

import { fadeAnimation } from './layout/animations/routing-fade.animation';

@Component({
  selector: 'ho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
