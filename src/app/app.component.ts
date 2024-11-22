import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterHistoryService } from './core/services/router-history.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {
  constructor (private readonly _routerHistory: RouterHistoryService) {
    this._routerHistory.initialise();
  }
}
