// Core
import { INestApplication } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

export const initializeLogger = (app: INestApplication): void => {
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useLogger(app.get(Logger));
};
