import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { JwtAuthGuard } from 'src/common/guards';
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
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
