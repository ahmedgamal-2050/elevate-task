import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'issues' },
  {
    path: 'issues',
    loadComponent: () =>
      import('./pages/issues/issues.component').then((m) => m.IssuesComponent),
  },
  {
    path: 'issues/:id',
    loadComponent: () =>
      import('./pages/issues/issue-details/issue-details.component').then(
        (m) => m.IssueDetailsComponent
      ),
  },
  {
    path: 'issues/:id/comments',
    loadComponent: () =>
      import('./pages/issues/issue-comments/issue-comments.component').then(
        (m) => m.IssueCommentsComponent
      ),
  },
  {
    path: 'issues/form',
    loadComponent: () =>
      import('./pages/issues/issue-form/issue-form.component').then(
        (m) => m.IssueFormComponent
      ),
  },
  { path: '**', redirectTo: 'issues' },
];
