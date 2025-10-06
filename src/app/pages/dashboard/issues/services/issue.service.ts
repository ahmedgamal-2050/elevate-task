import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../../common/constants/endpoints.constants';
import { Issue } from '../issues.model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private readonly http = inject(HttpClient);

  getIssues() {
    return this.http.get(ENDPOINTS.GET_ISSUES);
  }

  getIssueDetails(id: number) {
    return this.http.get(
      ENDPOINTS.GET_ISSUE_DETAILS.replace(':id', id.toString())
    );
  }

  getIssueComments(id: number) {
    return this.http.get(
      ENDPOINTS.GET_ISSUE_COMMENTS.replace(':id', id.toString())
    );
  }

  createIssue(issue: Partial<Issue>) {
    return this.http.post<Issue>(ENDPOINTS.POST_ISSUE, issue, {
      observe: 'response',
    });
  }
}
