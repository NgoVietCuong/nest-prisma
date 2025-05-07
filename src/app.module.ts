import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/common/logger';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { PrismaModule } from 'src/shared/prisma';
import { CacheProviderModule } from 'src/shared/cache';
import { validationSchema, appConfiguration, jwtConfiguration } from 'config';

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
    CacheProviderModule,
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
