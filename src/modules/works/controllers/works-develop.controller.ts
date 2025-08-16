// Core
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';

// Services
import { WorksDevelopService } from '../services/works-develop.service';

// Guards
import { AuthGuard } from '@/modules/core/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('works-develop')
export class WorksDevelopController {
  public constructor(private readonly service: WorksDevelopService) {}

  @Get('fix-titles-and-slugs')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async fixTitlesAndSlugs(): Promise<void> {
    return this.service.updateTitlesAndSlugs();
  }
}
