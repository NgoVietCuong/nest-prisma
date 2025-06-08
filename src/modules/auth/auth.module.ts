import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { AuthStrategy, RefreshTokenStrategy } from 'src/modules/auth/strategies';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfiguration),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfiguration)],
      useFactory: async (jwtConfig: ConfigType<typeof jwtConfiguration>) => ({
        global: true,
        secret: jwtConfig.secret,
        signOptions: {
          algorithm: jwtConfig.algorithm,
        },
      }),
      inject: [jwtConfiguration.KEY],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
