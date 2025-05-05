import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/common/logger';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { PrismaModule } from 'src/shared/prisma';
import { validationSchema, appConfiguration } from 'config';

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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [
            createKeyv(configService.get<string>('REDIS_URL')),
          ],
        };
      },
      inject: [ConfigService]
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (appConfig: ConfigType<typeof appConfiguration>) => {
        return winstonConfig(appConfig.appName);
      },
      inject: [appConfiguration.KEY],
    }),
    UserModule,
    AuthModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ]
})
export class AppModule {}
