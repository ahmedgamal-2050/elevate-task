import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'issue/list' },
  {
    path: 'issue/list',
    loadComponent: () =>
      import('./pages/issues/issues.component').then((m) => m.IssuesComponent),
  },
  {
    path: 'issue/create',
    loadComponent: () =>
      import('./pages/issues/issue-form/issue-form.component').then(
        (m) => m.IssueFormComponent
      ),
  },
  {
    path: 'issue/:id',
    loadComponent: () =>
      import('./pages/issues/issue-details/issue-details.component').then(
        (m) => m.IssueDetailsComponent
      ),
  },
  {
    path: 'issue/:id/comments',
    loadComponent: () =>
      import('./pages/issues/issue-comments/issue-comments.component').then(
        (m) => m.IssueCommentsComponent
      ),
  },
  { path: '**', redirectTo: 'issue/list' },
];
