import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma';
import { GenerateAdminCommand } from './generate-admin.command';

@Module({
  imports: [PrismaModule],
  providers: [GenerateAdminCommand]
})
export class CommandModule{}