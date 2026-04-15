import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(where: Prisma.UserWhereInput): Promise<User> {
    return this.prisma.user.findFirst({ where });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
