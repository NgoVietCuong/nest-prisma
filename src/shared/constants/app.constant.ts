import { NodeEnv } from '../enums';

export const APP_DEFAULTS = {
  NODE_ENV: NodeEnv.LOCAL,
  APP_NAME: 'Nestjs Prisma',
  APP_PORT: 3000,
  ACCESS_TOKEN_EXPIRES_IN: 86400000, // 1 day,
  REFRESH_TOKEN_EXPIRES_IN: 2592000000, // 30 days
  RESET_PASSWORD_CODE: {
    LENGTH: 6,
    TTL: 600000, // 10 minutes
  },
  VERIFY_SIGNUP_CODE: {
    LENGTH: 6,
    TTL: 300000, // 5 minutes
  },
};

