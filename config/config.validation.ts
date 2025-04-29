import * as Joi from 'joi';

export const validationSchema = Joi.object({
  SERVER_DEFAULT_CONFIG: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

    //App config validation
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().required(),

    //Database config validation
    DATABASE_URL: Joi.string().required(),
  })
});