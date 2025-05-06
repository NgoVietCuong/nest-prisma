export const APP_CONSTANT = {
  RESET_PASSWORD_CODE: {
    LENGTH: 6,
    TTL: 600, // 10 minutes
  },
  VERIFY_SIGNUP_CODE: {
    LENGTH: 6,
    TTL: 300, // 5 minutes
  },
  ACCESS_TOKEN: {
    EXPIRES_IN: 2592000,
  },
  REFRESH_TOKEN: {
    EXPIRES_IN: 2592000 // 30 days
  },
};

