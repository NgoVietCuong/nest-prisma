import * as Joi from 'joi';
import { NodeEnv, JwtAlgorithm } from 'src/shared/enums';
import { APP_DEFAULTS } from 'src/shared/constants';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NodeEnv))
    .default(NodeEnv.LOCAL),

  //App config validation
  APP_NAME: Joi.string().default(APP_DEFAULTS.APP_NAME),
  APP_PORT: Joi.number().default(APP_DEFAULTS.APP_PORT),

  //Database config validation
  DATABASE_URL: Joi.string().uri().required(),

  //Redis config validation
  REDIS_URL: Joi.string().uri().required(),

  //JWT config validation
  JWT_SECRET: Joi.string().required(),
  JWT_ALGORITHM: Joi.string()
    .valid(...Object.values(JwtAlgorithm))
    .default(JwtAlgorithm.HS256),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.number()
    .default(APP_DEFAULTS.ACCESS_TOKEN_EXPIRES_IN)
    .when('NODE_ENV', {
      is: Joi.string().valid(NodeEnv.PRODUCTION),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.number()
    .default(APP_DEFAULTS.REFRESH_TOKEN_EXPIRES_IN)
    .when('NODE_ENV', {
      is: Joi.string().valid(NodeEnv.PRODUCTION),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
});
