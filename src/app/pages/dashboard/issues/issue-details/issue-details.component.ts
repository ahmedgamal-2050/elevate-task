import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, finalize } from 'rxjs';
import { IssueService } from '../services/issue.service';
import { IssueCommentsComponent } from '../issue-comments/issue-comments.component';
import { APP_ROUTES } from '../../../../common/constants/app-routes.constants';

@Component({
  selector: 'app-issue-details',
  imports: [RouterLink, IssueCommentsComponent],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss',
})
export class IssueDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly issueService = inject(IssueService);

  loading = signal(false);
  error = signal<string | null>(null);
  issue = signal<Post | null>(null);
  comments = signal<CommentItem[]>([]);
  appRoutes = APP_ROUTES;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isFinite(id)) {
      this.error.set('Invalid issue id.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      issue: this.issueService.getIssueDetails(id),
      comments: this.issueService.getIssueComments(id),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ issue, comments }) => {
          this.issue.set(issue as Post);
          this.comments.set(comments as CommentItem[]);
        },
        error: () => this.error.set('Failed to load issue details.'),
      });
  }
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommentItem {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
