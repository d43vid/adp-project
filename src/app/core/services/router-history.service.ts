import { Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, scan } from 'rxjs/operators';

export interface RouterHistory {
  id: number;
  currentIndex: number;
  event: RouterEvent | undefined;
  trigger: 'imperative' | 'popstate' | 'hashchange' | undefined;
  idToRestore: number | undefined;
  history: { id: number; url: string; }[];
}

@Injectable({
  providedIn: 'root',
})
export class RouterHistoryService {
  previousUrl = signal<string | undefined>(undefined);
  currentUrl = signal<string | undefined>(undefined);

  constructor (private _router: Router) { }

  initialise(): void {
    this._router.events
      .pipe(
        filter((event): event is NavigationStart | NavigationEnd => event instanceof NavigationStart || event instanceof NavigationEnd),
        scan<NavigationStart | NavigationEnd, RouterHistory>(
          (acc, event) => {
            if (event instanceof NavigationStart) {
              return {
                ...acc,
                event,
                trigger: event.navigationTrigger,
                id: event.id,
                idToRestore: (event.restoredState && event.restoredState.navigationId) || undefined,
              };
            }

            const history = [...acc.history];
            let currentIndex = acc.currentIndex;

            if (acc.trigger === 'imperative') {
              history.splice(currentIndex + 1);
              history.push({ id: acc.id, url: event.urlAfterRedirects });
              currentIndex = history.length - 1;
            }

            if (acc.trigger === 'popstate') {
              const idx = history.findIndex((x) => x.id === acc.idToRestore);

              if (idx > -1) {
                currentIndex = idx;
                history[idx].id = acc.id;
              } else {
                currentIndex = 0;
              }
            }
            return {
              ...acc,
              event,
              history,
              currentIndex,
            };
          },
          {
            event: undefined,
            history: [],
            trigger: undefined,
            id: 0,
            idToRestore: 0,
            currentIndex: 0,
          }
        ),
        filter(({ event, trigger }) => event instanceof NavigationEnd && !!trigger)
      )
      .subscribe(({ history, currentIndex }) => {
        const previous = history[currentIndex - 1];
        const current = history[currentIndex];

        this.previousUrl.set(previous ? previous.url : undefined);
        this.currentUrl.set(current ? current.url : undefined);
      });
  }
}
