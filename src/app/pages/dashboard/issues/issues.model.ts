export interface Issue {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentItem {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
