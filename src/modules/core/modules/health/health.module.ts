// Core
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

// Controllers
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
