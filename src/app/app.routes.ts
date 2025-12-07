import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'warehouse',
    loadComponent: () => import('./pages/warehouse/warehouse').then((m) => m.Warehouse),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
  },
];
