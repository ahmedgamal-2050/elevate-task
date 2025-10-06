import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './issue-form.component.html',
  styleUrl: './issue-form.component.scss',
})
export class IssueFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly issueService = inject(IssueService);
  private readonly router = inject(Router);

  submitting = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  form!: FormGroup<{
    title: FormControl<string>;
    body: FormControl<string>;
  }>;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set(null);
    this.success.set(null);
    const payload = this.form.getRawValue();
    this.issueService.postIssue(payload).subscribe({
      next: (created: unknown) => {
        const id = (created as any)?.id;
        this.success.set('Issue created successfully.');
        if (id) {
          this.router.navigate(['/issue', id]);
        } else {
          this.router.navigate(['/issue/list']);
        }
      },
      error: () => {
        this.error.set('Failed to create issue.');
      },
      complete: () => this.submitting.set(false),
    });
  }

  get title() {
    return this.form.controls.title;
  }
  get body() {
    return this.form.controls.body;
  }
}
