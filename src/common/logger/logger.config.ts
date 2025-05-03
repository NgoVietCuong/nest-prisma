import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import chalk from 'chalk';
import 'winston-daily-rotate-file';
import { SPLAT } from 'triple-beam';
import { getAppConfig } from 'config';

export const winstonConfig = (appName: string): WinstonModuleOptions => {
  const { nodeEnv } = getAppConfig();

  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ level: true, message: true }),
    winston.format.printf((info) => {
      const appPrefix = chalk.blue(`[${appName}]`);
      const context = chalk.cyan(`[${info.context || 'Application'}]`);
      if (info.message) {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${info.message}`;
      } else {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${JSON.stringify(info)}`;
      }
    }),
  );

  const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
      let logContent = `[${appName}] ${info.timestamp} [${info.level}]: `;
      if (info.message) {
        logContent += `${info.message}.`;
        if (info?.stack) {
          logContent += `\n    STACK: ${info.stack}.`;
        }
      } else {
        logContent += `${JSON.stringify(info)}.`;
      }
      if (info[SPLAT]) {
        logContent += `\n    SPLAT: ${JSON.stringify(info[SPLAT])}`;
      }
      logContent += `\n`;

      return logContent;
    }),
  );

  return {
    transports: [
      // Console transport
      new winston.transports.Console({
        level: nodeEnv === 'production' ? 'info' : 'debug',
        format: consoleFormat,
        handleExceptions: true,
      }),

      // File transport for errors
      new winston.transports.DailyRotateFile({
        format: logFormat,
        level: 'error',
        filename: `logs/${appName}/error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),

      // File transport for all logs
      new winston.transports.DailyRotateFile({
        format: logFormat,
        level: 'info',
        filename: `logs/${appName}/application-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ]
  }
};