import { UserResponse } from './create-user-response.dto';

export class CommentForPostDto {
  id: number;
  content: string;
  author: UserResponse;
}
