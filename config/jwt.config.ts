import { registerAs } from '@nestjs/config';
import { APP_CONSTANT } from 'src/shared/constants';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  algorithm: process.env.JWT_ALGORITHM,
  accessTokenExpired: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || APP_CONSTANT.ACCESS_TOKEN.EXPIRES_IN,
  refreshTokenExpired: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || APP_CONSTANT.REFRESH_TOKEN.EXPIRES_IN,
}))