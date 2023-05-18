import { PostResponseForUserDto } from './post-user-response.dto';

export class UserResponse {
  id: string;
  name: string;
  email: string;
}

export class UserResponseGeneral {
  id: string;
  name: string;
  email: string;
  posts: PostResponseForUserDto[];
}
