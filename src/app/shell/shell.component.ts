import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterHistoryService } from '../core/services/router-history.service';
import { ActiveNavPipe } from './active-nav.pipe';
import { CommonModule } from '@angular/common';

type Path = {
  label: string;
  url: string;
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [ActiveNavPipe, CommonModule, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  readonly activePath: Signal<Array<string>>;

  constructor (private readonly _route: ActivatedRoute, private readonly _router: Router, private readonly _routerHistory: RouterHistoryService) {
    this.activePath = computed(() => {
      const currentUrl = this._routerHistory.currentUrl();
      return currentUrl?.split('/')?.filter((url) => !!url) || [];
    });
  }

  readonly paths: Path[] = [
    { label: 'Dijkstra Algorithm', url: 'dijkstra-algorithm' },
    { label: 'Dynamic Array', url: 'dynamic-array' },
  ];

  routeTo(path: Path): void {
    this._router.navigate([path.url], { relativeTo: this._route });
  }
}
