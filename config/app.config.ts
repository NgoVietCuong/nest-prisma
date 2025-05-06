import { registerAs } from '@nestjs/config';
import { NodeEnv } from 'src/shared/enums';
import { APP_DEFAULTS } from 'src/shared/constants';

export const getAppConfig = () => ({
  nodeEnv: process.env.NODE_ENV || NodeEnv.LOCAL,
  appName: process.env.APP_NAME || APP_DEFAULTS.APP_NAME,
  appPort: parseInt(process.env.APP_PORT || APP_DEFAULTS.APP_PORT, 10),
  isProductionEnv: process.env.NODE_ENV === NodeEnv.PRODUCTION,
});

export default registerAs('app', getAppConfig);