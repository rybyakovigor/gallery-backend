// Core
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule, HealthModule, DatabaseModule],
})
export class CoreModule {}
