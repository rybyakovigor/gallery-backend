// Core
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
})
export class CoreModule {}
