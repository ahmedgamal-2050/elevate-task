export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const ENDPOINTS = {
  GET_ISSUES: BASE_URL + '/posts',
  GET_ISSUE_DETAILS: BASE_URL + '/posts/:id',
  GET_ISSUE_COMMENTS: BASE_URL + '/posts/:id/comments',
  POST_ISSUE: BASE_URL + '/posts',
};
