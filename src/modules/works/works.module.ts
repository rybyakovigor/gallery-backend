// Core
import { Module } from '@nestjs/common';

// Repositories
import { WorksRepository } from './works.repository';

// Services
import { WorksService } from './works.service';

// Controllers
import { WorksController } from './works.controller';

@Module({
  providers: [WorksRepository, WorksService],
  controllers: [WorksController],
})
export class WorksModule {}
