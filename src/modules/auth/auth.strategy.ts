import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { UserStatus } from 'src/generated/prisma/client';
import { RedisService } from 'src/infrastructure/redis';
import { UserService } from 'src/modules/user';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';
import { TokenPayload, UserRequestPayload, UserSessionData } from 'src/shared/interfaces';
import { Logger } from 'winston';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(jwtConfiguration.KEY) private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });

    this.logger = this.logger.child({ context: AuthStrategy.name });
  }

  async validate(payload: TokenPayload): Promise<UserRequestPayload> {
    const { id, email, type, jti } = payload;
    if (type !== JwtTokenType.AccessToken)
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    let isRedisDown = false;
    let userSession: UserSessionData | null = null;

    try {
      userSession = await this.redisService.getValue<UserSessionData>(userTokenKey);
    } catch {
      isRedisDown = true;
    }

    if (!isRedisDown && !userSession) {
      throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }

    // Check database when redis is down
    if (isRedisDown) {
      const user = await this.userService.findUser({ id });
      if (!user) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

      userSession = {
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
      };
    }

    if (!userSession) {
      throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }
    if (!userSession.emailVerified) {
      throw new ServerException(ERROR_RESPONSE.EMAIL_NOT_VERIFIED);
    }
    if (userSession.status !== UserStatus.Active) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_ACTIVE);
    }

    return { id, jti, email, role: userSession.role, emailVerified: userSession.emailVerified };
  }
}
