import { registerAs } from '@nestjs/config';
import type { Algorithm } from 'jsonwebtoken';
import { JwtAlgorithm } from 'src/shared/enums';
import { APP_DEFAULTS } from 'src/shared/constants';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET!,
  algorithm: (process.env.JWT_ALGORITHM as Algorithm) || JwtAlgorithm.HS256,
  accessTokenExpiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN) || APP_DEFAULTS.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN) || APP_DEFAULTS.REFRESH_TOKEN_EXPIRES_IN,
}));
