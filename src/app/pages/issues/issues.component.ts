import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { IssueService } from './services/issue.service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-issues',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss',
})
export class IssuesComponent implements OnInit {
  private readonly issueService = inject(IssueService);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  issues = signal<Post[]>([]);
  filteredIssues = signal<Post[]>([]);

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this.loading.set(true);
    this.error.set(null);
    this.issueService
      .getIssues()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (issues: unknown) => {
          const data = (issues as Post[]).slice(0, 50);
          this.issues.set(data);
          this.applyFilter();
        },
        error: () => {
          this.error.set('Failed to load issues.');
        },
      });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.applyFilter();
  }

  private applyFilter() {
    const query = this.searchTerm().trim().toLowerCase();
    if (!query) {
      this.filteredIssues = this.issues;
      return;
    }
    this.filteredIssues.set(
      this.issues().filter((issue) => issue.title.toLowerCase().includes(query))
    );
  }

  trackById(index: number, item: Post) {
    return item.id;
  }
}
