// Core
import { Module } from '@nestjs/common';

// Repositories
import { FramingTypesRepository } from './framing-types.repository';

// Services
import { FramingTypesService } from './framing-types.service';

// Controllers
import { FramingTypesController } from './framing-types.controller';

@Module({
  providers: [FramingTypesRepository, FramingTypesService],
  controllers: [FramingTypesController],
})
export class FramingTypesModule {}
