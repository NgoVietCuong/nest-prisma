import * as Joi from 'joi';
import { NodeEnv, JwtAlgorithm } from 'src/shared/enums';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NodeEnv)).required(),

  //App config validation
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),

  //Database config validation
  DATABASE_URL: Joi.string().required(),

  //Redis config validation
  REDIS_URL: Joi.string().required(),

  //JWT config validation
  JWT_SECRET: Joi.string().required(),
  JWT_ALGORITHM: Joi.string().valid(...Object.values(JwtAlgorithm)).required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.number().when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.PRODUCTION),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.number().when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.PRODUCTION),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
});