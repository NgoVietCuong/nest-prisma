import * as winston from 'winston';
import chalk from 'chalk';
import type { WinstonModuleOptions } from 'nest-winston';
import { getAppConfig } from 'src/config';
import { NodeEnv } from 'src/shared/enums';
import 'winston-daily-rotate-file';
import type { LogInfo } from './logger.interface';

export const winstonConfig = (appName: string): WinstonModuleOptions => {
  const { nodeEnv } = getAppConfig();

  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ level: true, message: true }),
    winston.format.printf((info: LogInfo) => {
      const appPrefix = chalk.blue(`[${appName}]`);
      const context = chalk.cyan(`[${info.context || 'Application'}]`);
      if (info.message) {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${info.message}`;
      } else {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${JSON.stringify(info)}`;
      }
    }),
  );

  return {
    transports: [
      // Console transport
      new winston.transports.Console({
        level: nodeEnv === NodeEnv.Production ? 'info' : 'debug',
        format: consoleFormat,
        handleExceptions: true,
      }),
    ],
  };
};
