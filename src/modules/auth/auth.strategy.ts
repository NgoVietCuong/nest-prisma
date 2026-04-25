import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { UserStatus } from 'src/generated/prisma/client';
import { RedisService } from 'src/infrastructure/redis';
import { UserService } from 'src/modules/user';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';
import { TokenPayload, UserRequestPayload, UserSessionData } from 'src/shared/interfaces';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private redisService: RedisService,
    @Inject(jwtConfiguration.KEY) private jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<UserRequestPayload> {
    const { id, email, type, jti } = payload;
    if (type !== JwtTokenType.AccessToken)
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const userSession = await this.redisService.getValue<UserSessionData>(userTokenKey);

    if (!userSession) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    if (!userSession.emailVerified) {
      throw new ServerException(ERROR_RESPONSE.EMAIL_NOT_VERIFIED);
    }
    if (userSession.status !== UserStatus.Active) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_ACTIVE);
    }

    return { id, jti, email, role: userSession.role, emailVerified: userSession.emailVerified };
  }
}
