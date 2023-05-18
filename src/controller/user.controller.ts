// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserRepository } from 'src/repositories/user-repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userRepository.get(id);
  }

  @Post('create')
  async postUser(@Body() body: CreateUserDto) {
    return await this.userRepository.post(body);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    return await this.userRepository.put(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userRepository.delete(id);
  }
}
