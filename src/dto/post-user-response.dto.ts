import { CommentForPostDto } from './comment-user-response.dto';
import { LikeResponsePostDto } from './like-user-response.dto';

export class PostResponseForUserDto {
  id: number;
  title: string;
  content: string;
  comments: CommentForPostDto[];
  likes: LikeResponsePostDto[];
}
