import { Route } from '@angular/router';
import { APP_ROUTES } from './common/constants/app-routes.constants';
import { dashboardRoutes } from './layout/dashboard.routes';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: APP_ROUTES.DASHBOARD.ROOT },
  {
    path: APP_ROUTES.DASHBOARD.ISSUE.ROOT,
    children: [...dashboardRoutes],
  },
];
