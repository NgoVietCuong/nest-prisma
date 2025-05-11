import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user';
import { jwtConfiguration } from 'config';
import { ServerException } from 'src/common/exceptions';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { CacheService } from 'src/shared/cache';
import { JwtTokenType } from 'src/shared/enums';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private cacheService: CacheService,
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
    if (type !== JwtTokenType.ACCESS_TOKEN) throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const user = await this.userService.findUser({ email });
    if (!user) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    const cacheRefreshToken = await this.cacheService.getCache<string>(`${JwtTokenType.REFRESH_TOKEN}_${user.id}`);
    if (!cacheRefreshToken) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    return { id, email, role };
  }
}
