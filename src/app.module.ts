import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard, RoleBasedAccessControlGuard } from 'src/common/guards';
import { appConfiguration, validationSchema } from 'src/config';
import { winstonConfig } from 'src/infrastructure/logger';
import { PrismaModule } from 'src/infrastructure/prisma';
import { RedisModule } from 'src/infrastructure/redis';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
      load: [appConfiguration],
    }),
    WinstonModule.forRootAsync({
      useFactory: (appConfig: ConfigType<typeof appConfiguration>) => {
        return winstonConfig(appConfig.appName);
      },
      inject: [appConfiguration.KEY],
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleBasedAccessControlGuard,
    },
  ],
})
export class AppModule {}
