import { registerAs } from '@nestjs/config';
import { APP_DEFAULTS } from 'src/shared/constants';
import { NodeEnv } from 'src/shared/enums';

export const getAppConfig = () => ({
  nodeEnv: (process.env.NODE_ENV ?? NodeEnv.Local) as NodeEnv,
  appName: process.env.APP_NAME ?? APP_DEFAULTS.APP_NAME,
  appPort: +(process.env.APP_PORT ?? APP_DEFAULTS.APP_PORT),
  isProductionEnv: process.env.NODE_ENV === NodeEnv.Production,
});

export default registerAs('app', getAppConfig);
