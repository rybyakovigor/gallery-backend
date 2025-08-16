// Core
import { Module } from '@nestjs/common';

// Modules
import { FilesModule } from '../files/files.module';

// Repositories
import { WorksRepository } from './works.repository';

// Services
import { WorksService } from './services/works.service';
import { WorksDevelopService } from './services/works-develop.service';

// Controllers
import { WorksController } from './controllers/works.controller';
import { GalleryController } from './controllers/gallery.controller';
import { WorksDevelopController } from './controllers/works-develop.controller';

@Module({
  imports: [FilesModule],
  providers: [WorksRepository, WorksService, WorksDevelopService],
  controllers: [WorksController, GalleryController, WorksDevelopController],
})
export class WorksModule {}
