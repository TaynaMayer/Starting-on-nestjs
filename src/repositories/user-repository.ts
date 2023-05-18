// eslint-disable-next-line prettier/prettier
import { UserResponse, UserResponseGeneral } from 'src/dto/create-user-response.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';

export abstract class UserRepository {
  abstract get(id: string): Promise<UserResponseGeneral>;
  abstract post(user: CreateUserDto): Promise<UserResponse>;
  abstract put(id: string, user: CreateUserDto): Promise<UserResponse>;
  abstract delete(id: string): Promise<void>;
}
