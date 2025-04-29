import { registerAs } from '@nestjs/config';

export const appConfig = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'Nestjs Prisma',
  appPort: parseInt(process.env.APP_PORT || '3000', 10),
});

export default registerAs('app', () => appConfig);