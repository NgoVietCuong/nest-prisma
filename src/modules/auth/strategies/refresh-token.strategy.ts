import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfiguration } from 'src/config';
import { ServerException } from 'src/common/exceptions';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';
import { CacheService } from 'src/shared/cache';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
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
    const { id, email, type } = payload;
    if (type !== JwtTokenType.REFRESH_TOKEN) throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const cacheRefreshToken = await this.cacheService.getCache<string>(`${JwtTokenType.REFRESH_TOKEN}_${id}`);
    if (!cacheRefreshToken) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    return { id, email };
  }
}
