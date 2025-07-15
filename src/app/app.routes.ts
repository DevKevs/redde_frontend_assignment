import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Maintenance } from './components/maintenance/maintenance';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'maintenance',
    component: Maintenance,
  },
  {
    path: '**',
    component: Home,
  },
];
