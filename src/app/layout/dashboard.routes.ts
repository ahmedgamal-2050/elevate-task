import { Route } from '@angular/router';
import { APP_ROUTES } from '../common/constants/app-routes.constants';

export const dashboardRoutes: Route[] = [
  {
    path: APP_ROUTES.DASHBOARD.ISSUE.LIST,
    loadComponent: () =>
      import('../pages/dashboard/issues/issues.component').then(
        m => m.IssuesComponent
      ),
  },
  {
    path: APP_ROUTES.DASHBOARD.ISSUE.CREATE,
    loadComponent: () =>
      import('../pages/dashboard/issues/issue-form/issue-form.component').then(
        m => m.IssueFormComponent
      ),
  },
  {
    path: APP_ROUTES.DASHBOARD.ISSUE.DETAILS + '/:id',
    loadComponent: () =>
      import(
        '../pages/dashboard/issues/issue-details/issue-details.component'
      ).then(m => m.IssueDetailsComponent),
  },
  { path: '**', redirectTo: 'list' },
];
