// Core
import { Controller, Get, Param, Query } from '@nestjs/common';

// Services
import { WorksService } from '../works.service';

// Types
import { Work } from '../types/work';

// Pipes
import { UuidV6ValidationPipe } from '@/modules/core/pipes/validate-uuidv6.pipe';

@Controller('gallery')
export class GalleryController {
  public constructor(private readonly service: WorksService) {}

  @Get()
  public async findAll(@Query('limit') limit?: string): Promise<Work[]> {
    return this.service.findAllForGallery(limit);
  }

  @Get(':id')
  public async findById(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<Work> {
    return this.service.findById(id);
  }
}
