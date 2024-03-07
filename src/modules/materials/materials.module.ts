// Core
import { Module } from '@nestjs/common';

// Repositories
import { MaterialsRepository } from './materials.repository';

// Services
import { MaterialsService } from './materials.service';

// Controllers
import { MaterialsController } from './materials.controller';

@Module({
  providers: [MaterialsRepository, MaterialsService],
  controllers: [MaterialsController],
})
export class MaterialsModule {}
