import { Route } from '@angular/router';
import { dashboardRoutes } from './layout/dashboard.routes';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'issue' },
  {
    path: 'issue',
    children: [...dashboardRoutes],
  },
];
