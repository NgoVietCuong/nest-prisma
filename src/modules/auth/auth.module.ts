import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { jwtConfiguration } from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [jwtConfiguration] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (jwtConfig: ConfigType<typeof jwtConfiguration>) => ({
        secret: jwtConfig.secret,
        signOptions: {
          algorithm: jwtConfig.algorithm,
        },
      }),
      inject: [jwtConfiguration.KEY],
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
