// Core
import { Module } from '@nestjs/common';

// Modules
import { LoggerModule as PinoLogger } from 'nestjs-pino';

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        serializers: {
          req(req) {
            return {
              method: req.method,
              url: req.url,
              query: req.query,
              body: req.raw.body,
            };
          },
          res(res) {
            return {
              statusCode: res.statusCode,
              statusMessage: res.statusMessage,
            };
          },
          err(error) {
            // Если ошибка в приложении
            return {
              type: error?.type,
              meta: error?.meta,
              code: error?.code,
              message: error?.message,
            };
          },
        },
        customLogLevel: (_, res, err) => {
          if (res.statusCode >= 400 || err) {
            return 'error';
          }
          if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
          }
          return 'info';
        },
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true, colorize: true, errorLikeObjectKeys: ['err', 'error'] },
        },
      },
    }),
  ],
})
export class LoggerModule {}
