import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ServerException } from 'src/common/exceptions';
import { Role } from 'src/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/prisma';
import { z } from 'zod';

@Command({
  name: 'generate-admin',
  description: 'Generate admin user',
})
export class GenerateAdminCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateAdminCommand.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async run(passedParams: string[], options: Record<string, string>) {
    const { email, password } = options;

    try {
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (user) {
        this.logger.warn(`User with email ${email} already exists`);
        return;
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        username: 'Admin',
        email,
        password: hashedPassword,
        emailVerified: true,
        role: Role.Admin,
      };

      await this.prisma.user.create({ data: userData });
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
    const result = z.string().email('Invalid email format').safeParse(val);

    if (!result.success) {
      throw new Error(result.error.errors[0].message);
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
