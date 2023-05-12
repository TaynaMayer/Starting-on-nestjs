import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from 'src/repositories/user-repository';
import { UserController } from '../../controller/user.controller';
import { UserService } from '../../service/user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
