// Core
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// Modules
import { ConfigModule } from './modules/config/config.module';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';
import { S3Module } from './modules/s3/s3.module';

// Pipes
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [ConfigModule, LoggerModule, HealthModule, DatabaseModule, S3Module],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class CoreModule {}
