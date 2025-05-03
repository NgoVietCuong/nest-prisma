import { registerAs } from '@nestjs/config';
import { NODE_ENV } from 'src/shared/enums';

export const getAppConfig = () => ({
  nodeEnv: process.env.NODE_ENV || NODE_ENV.LOCAL,
  appName: process.env.APP_NAME || 'Nestjs Prisma',
  appPort: parseInt(process.env.APP_PORT || '3000', 10),
  isProductionEnv: process.env.NODE_ENV === NODE_ENV.PRODUCTION,
});

export default registerAs('app', getAppConfig);