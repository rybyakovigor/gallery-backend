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
            };
          },
          res(res) {
            return {
              code: res.raw.err?.status,
              message: res.raw.err?.message,
            };
          },
          err() {
            return;
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
        transport: { target: 'pino-pretty', options: { singleLine: true } },
      },
    }),
  ],
})
export class LoggerModule {}
