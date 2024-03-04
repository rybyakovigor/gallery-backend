// Core
import { Module } from '@nestjs/common';

// Modules
import { S3Module } from '../core/modules/s3/s3.module';

// Services
import { FilesService } from './services/files.service';
import { ImageHandlingService } from './services/image-handling.service';

// Controllers
import { FilesController } from './controllers/files.controller';

// Repositories
import { FilesRepository } from './files.repository';

@Module({
  imports: [S3Module],
  providers: [FilesRepository, FilesService, ImageHandlingService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
