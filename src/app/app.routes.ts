import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { DynamicArrayComponent } from './components/dynamic-array/dynamic-array.component';
import { DijkstraAlgorithmComponent } from './components/dijkstra-algorithm/dijkstra-algorithm.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'dijkstra-algorithm', pathMatch: 'full'
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dijkstra-algorithm',
        component: DijkstraAlgorithmComponent
      },
      {
        path: 'dynamic-array',
        component: DynamicArrayComponent
      }
    ]
  }
];
