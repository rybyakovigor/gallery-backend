// Core
import { Module } from '@nestjs/common';

// Repositories
import { MetricsRepository } from './metrics.repository';

// Services
import { MetricsService } from './metrics.service';

// Controllers
import { MetricsController } from './metrics.controller';

@Module({
  providers: [MetricsRepository, MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
