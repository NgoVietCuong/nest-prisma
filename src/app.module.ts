import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
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
  ]
})
export class AppModule {}
