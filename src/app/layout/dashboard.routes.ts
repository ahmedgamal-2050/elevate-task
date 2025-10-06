import { Route } from '@angular/router';

export const dashboardRoutes: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('../pages/dashboard/issues/issues.component').then(
        (m) => m.IssuesComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../pages/dashboard/issues/issue-form/issue-form.component').then(
        (m) => m.IssueFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import(
        '../pages/dashboard/issues/issue-details/issue-details.component'
      ).then((m) => m.IssueDetailsComponent),
  },
  {
    path: ':id/comments',
    loadComponent: () =>
      import(
        '../pages/dashboard/issues/issue-comments/issue-comments.component'
      ).then((m) => m.IssueCommentsComponent),
  },
  { path: '**', redirectTo: 'list' },
];
