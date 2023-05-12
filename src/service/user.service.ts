import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserResponseCreate } from 'src/dto/create-user-response.dto';
import { UserRepository } from 'src/repositories/user-repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async post(user: CreateUserDto): Promise<UserResponseCreate> {
    const existByEmail = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (existByEmail) {
      throw new Error(`O usuário com o email ${user.email} já existe`);
    }
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }
}
