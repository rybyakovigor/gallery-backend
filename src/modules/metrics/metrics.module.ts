// Core
import { Module } from '@nestjs/common';

// Modules
import { DadataModule } from '../core/modules/dadata/dadata.module';

// Repositories
import { MetricsRepository } from './metrics.repository';

// Services
import { MetricsService } from './metrics.service';

// Controllers
import { MetricsController } from './metrics.controller';

@Module({
  imports: [DadataModule],
  providers: [MetricsRepository, MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
