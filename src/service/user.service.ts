import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
// eslint-disable-next-line prettier/prettier
import { UserResponse, UserResponseGeneral } from 'src/dto/create-user-response.dto';
import { UserRepository } from 'src/repositories/user-repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async get(id: string): Promise<UserResponseGeneral> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                author: true,
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error(`${id} não encontrado!`);
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      posts: user.posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        comments: post.comments.map((coment) => ({
          id: coment.id,
          content: coment.content,
          author: coment.author,
        })),
        likes: post.likes.map((like) => ({
          id: like.id,
          user: like.user,
        })),
      })),
    };
  }

  async put(id: string, user: CreateUserDto): Promise<UserResponse> {
    const selectedUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!selectedUser) {
      throw new Error(`O usuário com o user ${id} não existe`);
    }
    const existByEmail = await this.prisma.user.findFirst({
      where: {
        email: user.email.toLowerCase(),
      },
    });
    if (existByEmail && existByEmail.email !== selectedUser.email) {
      throw new Error(`O usuário com o email ${user.email} já existe`);
    }
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
    };
  }

  async post(user: CreateUserDto): Promise<UserResponse> {
    const existByEmail = await this.prisma.user.findFirst({
      where: {
        email: user.email.toLowerCase(),
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

  async delete(id: string): Promise<void> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    if (!deletedUser) {
      throw new Error(`O usuário com o id ${id} não existe`);
    }
  }
}
