import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { isEmail } from 'class-validator';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ServerException } from 'src/common/exceptions';
import { PrismaService } from 'src/infrastructure/prisma';
import { ERROR_RESPONSE } from 'src/shared/constants';

@Command({
  name: 'generate-admin',
  description: 'Generate admin user',
  // arguments: '<email> <password>'
})
export class GenerateAdminCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateAdminCommand.name);

  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async run(passedParams: string[], options: Record<string, string>) {
    try {
      const { email, password } = options;

      const user = await this.prismaService.user.findFirst({ where: { email } });
      if (user) throw new ServerException(ERROR_RESPONSE.USER_ALREADY_EXISTS);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        username: 'admin',
        email,
        password: hashedPassword,
        emailVerified: true,
        role: Role.ADMIN,
      };

      await this.prismaService.user.create({ data: userData });
      this.logger.log('Created admin user successfully');
    } catch (error) {
      if (error instanceof ServerException) {
        this.logger.error(`${error.message}`);
      } else {
        this.logger.error(
          'An unexpected error occurred',
          error instanceof Error ? error.stack : String(error),
        );
      }
    }
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'User email',
    required: true,
  })
  parseEmail(val: string): string {
    if (!isEmail(val)) {
      throw new Error('Email is invalid');
    }
    return val;
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'User password',
    required: true,
  })
  parsePassword(val: string): string {
    return val;
  }
}
