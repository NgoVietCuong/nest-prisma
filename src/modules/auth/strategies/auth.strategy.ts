import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { RedisService } from 'src/infrastructure/redis';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';
import { UserService } from 'src/modules/user';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';

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

  async validate(payload: any): Promise<RequestUserPayload> {
    const { id, email, type, role } = payload;
    if (type !== JwtTokenType.AccessToken)
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const user = await this.userService.findUser({ email });
    if (!user) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    const cacheRefreshToken = await this.redisService.getValue<string>(
      `${JwtTokenType.RefreshToken}_${user.id}`,
    );
    if (!cacheRefreshToken) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    return { id, email, role };
  }
}
