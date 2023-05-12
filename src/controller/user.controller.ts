import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

import { UserRepository } from 'src/repositories/user-repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('create')
  async postUser(@Body() body: CreateUserDto) {
    return await this.userRepository.post(body);
  }
}
