// Core
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Services
import { FilesService } from '../services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

// Types
import { File } from '../types/file';

// Guards
import { AuthGuard } from '@/modules/core/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  public constructor(private readonly service: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return await this.service.create(file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
