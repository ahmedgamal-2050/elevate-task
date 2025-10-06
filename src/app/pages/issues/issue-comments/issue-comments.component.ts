import { Component, input } from '@angular/core';

interface CommentItem {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-issue-comments',
  imports: [],
  templateUrl: './issue-comments.component.html',
  styleUrl: './issue-comments.component.scss',
})
export class IssueCommentsComponent {
  comment = input.required<CommentItem>();
}
