import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { RedisService } from 'src/infrastructure/redis';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
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
    const { id, email, type } = payload;
    if (type !== JwtTokenType.RefreshToken) throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    const cacheRefreshToken = await this.redisService.getValue<string>(`${JwtTokenType.RefreshToken}_${id}`);
    if (!cacheRefreshToken) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    return { id, email };
  }
}
