import * as Joi from 'joi';
import { JwtAlgorithm, NodeEnv } from 'src/shared/enums';

export const validationSchema = Joi.object({
  //Database config validation
  DATABASE_URL: Joi.string().uri().required(),

  //Redis config validation
  REDIS_URL: Joi.string().uri().required(),

  //JWT config validation
  JWT_SECRET: Joi.string().required(),
  JWT_ALGORITHM: Joi.string()
    .valid(...(Object.values(JwtAlgorithm) as string[]))
    .default(JwtAlgorithm.HS256),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.Production),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.Production),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});
