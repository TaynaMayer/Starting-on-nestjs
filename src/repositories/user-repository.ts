import { UserResponseCreate } from 'src/dto/create-user-response.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
export abstract class UserRepository {
  abstract post(user: CreateUserDto): Promise<UserResponseCreate>;
}
