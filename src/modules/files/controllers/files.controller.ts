// Core
import { Controller, Delete, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

// Services
import { FilesService } from '../services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

// Types
import { File } from '../types/file';

@Controller('files')
export class FilesController {
  public constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return await this.filesService.create(file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.filesService.delete(id);
  }
}
