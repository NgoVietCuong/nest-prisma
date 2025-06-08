import { NodeEnv } from '../enums';

export const APP_DEFAULTS = {
  NODE_ENV: NodeEnv.Local,
  APP_NAME: 'Nestjs Prisma',
  APP_PORT: 3000,
  ACCESS_TOKEN_EXPIRES_IN: '1d',
  REFRESH_TOKEN_EXPIRES_IN: '30d',
  RESET_PASSWORD_CODE: {
    LENGTH: 6,
    TTL: 600000, // 10 minutes
  },
  VERIFY_SIGNUP_CODE: {
    LENGTH: 6,
    TTL: 300000, // 5 minutes
  },
};
