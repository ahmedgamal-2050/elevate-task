import { Component, input } from '@angular/core';
import { CommentItem } from '../issues.model';

@Component({
  selector: 'app-issue-comments',
  imports: [],
  templateUrl: './issue-comments.component.html',
  styleUrl: './issue-comments.component.scss',
})
export class IssueCommentsComponent {
  comment = input.required<CommentItem>();
}
