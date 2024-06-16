// Core
import { Module } from '@nestjs/common';

// Modules
import { FilesModule } from '../files/files.module';

// Repositories
import { WorksRepository } from './works.repository';

// Services
import { WorksService } from './works.service';

// Controllers
import { WorksController } from './controllers/works.controller';
import { GalleryController } from './controllers/gallery.controller';

@Module({
  imports: [FilesModule],
  providers: [WorksRepository, WorksService],
  controllers: [WorksController, GalleryController],
})
export class WorksModule {}
