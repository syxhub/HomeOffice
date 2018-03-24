import { Component } from '@angular/core';

import { fadeAnimation } from './layout/animations/routing-fade.animation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
