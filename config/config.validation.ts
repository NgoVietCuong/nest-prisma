import * as Joi from 'joi';
import { NODE_ENV } from 'src/shared/enums';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NODE_ENV)).required(),

  //App config validation
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),

  //Database config validation
  DATABASE_URL: Joi.string().required(),

  //Redis config validation
  REDIS_URL: Joi.string().required()
});