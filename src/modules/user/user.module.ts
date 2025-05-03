import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/shared/prisma';

@Module({
  providers: [UserService],
  imports: [PrismaModule],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
